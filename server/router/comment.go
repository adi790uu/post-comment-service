package router

import (
	"post-comment-service/handlers"

	"github.com/gofiber/fiber/v2"
)

func CommentRoutes(app *fiber.App) {
	comment := app.Group("/v1/comment")
	comment.Post("/create", handlers.CreateComment)
}