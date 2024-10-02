# Project Overview

This is the server for a simple post-comment service built using Go and the Fiber web framework. It allows users to create posts and comments, retrieve them, and utilizes MongoDB for data storage along with in-memory caching for performance optimization.

## Technologies Used

1. **Go**: The primary programming language used for building the service.
2. **Fiber**: A fast web framework for Go, inspired by Express.js, which provides a simple and efficient way to handle HTTP requests.
3. **MongoDB**: A NoSQL database used for storing posts and comments. It allows for flexible data models and easy scalability.
4. **In-Memory Caching**: Implemented using a custom caching mechanism to store posts temporarily in memory, improving response times for frequently accessed data.

## Why MongoDB?

MongoDB was chosen for the following reasons:

1. **Schema Flexibility**: MongoDB's document-oriented structure allows for a flexible schema, making it easy to adapt to changes in data requirements without significant overhead.
2. **Scalability**: As the application grows, MongoDB can handle large volumes of data and high traffic loads, making it suitable for applications with unpredictable growth patterns.
3. **Performance**: MongoDB provides high performance for read and write operations, which is essential for a service that requires quick access to posts and comments.

## In-Memory Caching

In-memory caching was implemented for the get all posts endpoint:

1. **Performance Improvement**: Caching frequently accessed posts allows the application to respond more quickly without querying the database each time. This decreases latency and enhances the user experience. For instance, when the v1/post/all route was accessed on the production server, the response time dropped from 1200ms to approximately 450ms on the second access.
2. **Reduced Database Load**: Caching helps to minimize the number of read operations on the database, which can be beneficial in high-traffic scenarios, reducing the load on the database and improving overall system performance.

## Project Structure

- /server: Contains the main application code.
- /models: Defines the data models for posts and comments.
- /handlers: Contains the logic for handling HTTP requests related to posts and comments.
- /services/cache: Implements the caching mechanism for posts.
- /database: Manages the MongoDB connection and data retrieval.
- /router: Defines the routes for the application.
- /config: Contains configuration-related code, including environment variable loading.
- main.go: The entry point of the application.

## Running the Application

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and define the following variables:

   ```bash
    MONGO_URL=<your_mongo_db_connection_string>
    DB_NAME=<your_database_name>
   ```

3. **Install Dependencies**:

   ```bash
   make tidy
   ```

4. **Run the Application**:

   ```bash
    make run
   ```

5. **Access the API**:
   The application will be running on http://localhost:3000. You can access the following endpoints:

   - **GET** /v1/post/all: Retrieve all posts.
   - **GET** /v1/post/id: Retrieve a specific post by ID.
   - **POST** /v1/post/create: Create a new post.
   - **POST** /v1/comment/create: Create a new comment for a post.
