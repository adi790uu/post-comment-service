package router

import (
	"post-comment-service/handlers"

	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	post := app.Group("/v1/post")
	post.Get("/all", handlers.GetPosts)
	post.Get("/:id", handlers.GetPost)
	post.Post("/create", handlers.CreatePost)
}