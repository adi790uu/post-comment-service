package handlers

import (
	"log/slog"
	"post-comment-service/database"
	"post-comment-service/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateComment(c *fiber.Ctx) error {
	commentColl := database.GetCollection("comments")

	var postReqData struct {
		PostID  string `json:"postId"`
		Author  string `json:"author"`
		Content string `json:"content"`
	}

	if err := c.BodyParser(&postReqData); err != nil {
		slog.Error("Error parsing request body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "invalid request data"})
	}
	
	postObjectID, err := primitive.ObjectIDFromHex(postReqData.PostID)
	if err != nil {
		slog.Error("Invalid postId format:", err)
		return c.Status(400).JSON(fiber.Map{"error": "invalid postId format"})
	}

	comment := models.Comment{
		ID:      primitive.NewObjectID(),
		Author:  postReqData.Author,
		Content: postReqData.Content,
		PostID:  postObjectID,
		Date:    time.Now().Format(time.RFC3339),
	}

	slog.Info("Inserting comment for post with ID: " + postReqData.PostID)
	_, err = commentColl.InsertOne(c.Context(), comment)

	if err != nil {
		slog.Error("Error inserting comment:", err)
		return c.Status(500).JSON(fiber.Map{"error": "could not create comment"})
	}
	return c.Status(201).JSON(comment)
}
