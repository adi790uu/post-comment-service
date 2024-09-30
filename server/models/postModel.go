package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID        primitive.ObjectID `json:"id" bson:"_id"`
	Author  string             `json:"author" bson:"author"`
	Title string             `json:"title" bson:"title"`
	Content string			 `json:"content" bson:"content"`
	Date      string             `json:"date" bson:"date"`
}