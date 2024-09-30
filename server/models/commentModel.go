package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Comment struct {
	ID        primitive.ObjectID `json:"id" bson:"_id"`
	Author  string             `json:"author" bson:"author"`
	Content string			 `json:"content" bson:"content"`
	Date      string             `json:"date" bson:"date"`
	PostID    primitive.ObjectID `json:"post_id" bson:"post_id"`
}