package handlers

import (
	"encoding/json"
	"log/slog"
	"post-comment-service/models"
	"post-comment-service/services/cache"
	"time"

	"post-comment-service/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var postsCache = cache.NewPostCache(1 * time.Minute)

func GetPosts(c *fiber.Ctx) error {
	coll := database.GetCollection("posts")
	postsCache.CheckAndClear()

	if len(postsCache.GetAll()) > 0 {
		slog.Info("Returning cached posts")
		return c.Status(200).JSON(postsCache.GetAll())
	}

	cursor, err := coll.Find(c.Context(), bson.M{})
	if err != nil {
		slog.Error("Error finding documents:", err)
		return c.Status(500).JSON(fiber.Map{"error": "cannot find documents"})
	}
	defer cursor.Close(c.Context())

	var posts []models.Post
	if err = cursor.All(c.Context(), &posts); err != nil {
		slog.Error("Error decoding documents:", err)
		return c.Status(500).JSON(fiber.Map{"error": "cannot decode documents"})
	}
	slog.Info("Setting posts cache")
	postsCache.SetAll(posts)
	return c.Status(200).JSON(posts)
}

func GetPost(c *fiber.Ctx) error {
	postsColl := database.GetCollection("posts")
	commentsColl := database.GetCollection("comments")

	idParam := c.Params("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		slog.Error("Invalid ID format:", err)
		return c.Status(400).JSON(fiber.Map{"error": "invalid ID format"})
	}

	post := new(models.Post)
	slog.Info("Finding post with ID: " + id.Hex())
	findErr := postsColl.FindOne(c.Context(), bson.M{"_id": id}).Decode(&post)
	if findErr != nil {
		slog.Error("Error finding document:", findErr)
		return c.Status(500).JSON(fiber.Map{"error": "cannot find document"})
	}

	slog.Info("Finding comments for post with ID: " + id.Hex())
	cursor, err := commentsColl.Find(c.Context(), bson.M{"post_id": id})
	if err != nil {
		slog.Error("Error finding comments:", err)
		return c.Status(500).JSON(fiber.Map{"error": "cannot find comments"})
	}

	var comments []models.Comment
	if err = cursor.All(c.Context(), &comments); err != nil {
		slog.Error("Error decoding comments:", err)
		return c.Status(500).JSON(fiber.Map{"error": "cannot decode comments"})
	}

	return c.Status(200).JSON(fiber.Map{"post": post, "comments": comments})
}

func CreatePost(c *fiber.Ctx) error {
	coll := database.GetCollection("posts")

	var postReqData struct { 
		Author  string `json:"author"`
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	if err := json.Unmarshal(c.Body(), &postReqData); err != nil { 
		slog.Error("Error parsing request body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "invalid request data"})
	}

	post := models.Post{
		ID:      primitive.NewObjectID(),
		Author:  postReqData.Author,
		Title:   postReqData.Title,
		Content: postReqData.Content,
		Date:    time.Now().Format(time.DateTime),
	}

	slog.Info("Inserting post")
	res, err := coll.InsertOne(c.Context(), post)
	if err != nil {
		slog.Error("Error creating post:", err)
		return c.Status(500).JSON(fiber.Map{"error": "cannot create post"})
	}
	return c.Status(201).JSON(res)
}