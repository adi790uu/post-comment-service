import React, { useState } from "react";

interface Comment {
  author: string;
  content: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  comments: Comment[];
}

const PostDetailsPage: React.FC = () => {
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [post, setPost] = useState<Post>({
    id: 1,
    title: "Sample Post Title",
    author: "John Doe",
    content: "This is a sample post with rich text content displayed here.",
    comments: [
      { author: "Jane Smith", content: "Great post!" },
      { author: "Alex Johnson", content: "Thanks for sharing!" },
    ],
  });

  // Handle new comment submission
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentAuthor && newCommentContent) {
      const newComment = {
        author: newCommentAuthor,
        content: newCommentContent,
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
      setNewCommentAuthor("");
      setNewCommentContent("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="w-2/3 md:flex md:justify-around mx-auto">
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-4">By {post.author}</p>
          <div className="text-gray-700 bg-gray-200 p-2 rounded-md mb-6">
            {post.content}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Comments</h2>
          <form onSubmit={handleAddComment} className="mb-4 space-y-4">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="commentAuthor"
              >
                Your Name
              </label>
              <input
                type="text"
                id="commentAuthor"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="commentContent"
              >
                Comment
              </label>
              <textarea
                id="commentContent"
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your comment"
                rows={2}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Comment
            </button>
          </form>
          {post.comments.length > 0 ? (
            <ul className="space-y-4">
              {post.comments.map((comment, index) => (
                <li key={index} className="p-2 rounded-lg bg-white">
                  <p className="font-semibold text-gray-700">
                    {comment.author}
                  </p>
                  <p className="text-gray-600">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
