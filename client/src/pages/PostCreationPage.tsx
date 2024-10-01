import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import { useNavigate } from "react-router-dom";

const PostCreationPage: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      author,
      title,
      content,
    };

    console.log("New Post Created:", newPost);

    setAuthor("");
    setTitle("");
    setContent("");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="rounded-lg p-8 max-w-md w-full h-1/2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Create a New Post
          </h1>
          <button
            onClick={handleSubmit}
            className="hover:bg-slate-300 bg-slate-200 p-2 rounded-md"
          >
            Publish
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="author"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="title"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="content"
          >
            Post Content
          </label>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-48 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Write your content here..."
          />
        </form>
      </div>
    </div>
  );
};

export default PostCreationPage;
