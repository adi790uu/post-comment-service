package cache

import (
	"post-comment-service/models"
	"sync"
	"time" // Import time package

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type CachedPost struct {
	Post models.Post
}

type PostCache struct {
	mu             sync.RWMutex
	store          map[primitive.ObjectID]CachedPost 
	expirationTime time.Time                          
	duration       time.Duration                      
}

func NewPostCache(duration time.Duration) *PostCache {
	return &PostCache{
		store:    make(map[primitive.ObjectID]CachedPost),
		duration: duration,                                 
	}
}

func (c *PostCache) Set(post models.Post) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.store[post.ID] = CachedPost{
		Post: post,
	}
	c.expirationTime = time.Now().Add(c.duration) 
}

func (c *PostCache) CheckAndClear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	if time.Now().After(c.expirationTime) {
		c.store = make(map[primitive.ObjectID]CachedPost)
	}
}

func (c *PostCache) GetAll() []models.Post {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// Check if the store has expired
	if time.Now().After(c.expirationTime) {
		c.store = make(map[primitive.ObjectID]CachedPost)
		return []models.Post{}                            
	}

	posts := make([]models.Post, 0, len(c.store))
	for _, cachedPost := range c.store {
		posts = append(posts, cachedPost.Post)
	}
	return posts
}

func (c *PostCache) SetAll(posts []models.Post) {
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, post := range posts {
		c.store[post.ID] = CachedPost{
			Post: post,
		}
	}
	c.expirationTime = time.Now().Add(c.duration)
}

func (c *PostCache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.store = make(map[primitive.ObjectID]CachedPost)
}