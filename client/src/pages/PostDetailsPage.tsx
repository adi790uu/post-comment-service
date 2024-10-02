import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Define types for Post and Comment
interface Comment {
  author: string;
  content: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

const PostDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/post/${id}`);
        setPost(response.data.post);
        setComments(response.data.comments);
      } catch (err) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentAuthor && newCommentContent) {
      const newComment = {
        postId: id,
        author: newCommentAuthor,
        content: newCommentContent,
      };

      const result = await axios.post(
        "http://localhost:3000/v1/comment/create",
        newComment
      );

      if (result?.status !== 201) {
        console.error("Failed to create comment");
        return;
      }

      setComments((prevComments) => {
        return prevComments ? [...prevComments, newComment] : [newComment];
      });
      setNewCommentAuthor("");
      setNewCommentContent("");
    }
  };

  if (loading) {
    return <div className="h-screen text-center">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8">
      <div className="w-11/12 lg:w-2/3 mx-auto">
        {/* Post Section */}
        <div className="p-6 rounded-lg mb-4 bg-white">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
            {post.title}
          </h1>
          <p className="text-gray-500 text-center text-lg">By {post.author}</p>
          <p className="text-gray-400 text-center text-sm">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6 rounded-lg prose max-w-none mb-8 bg-white shadow-sm">
          {parse(post.content)}
        </div>

        <div className="p-6 rounded-lg bg-white shadow-md w-full">
          <h2 className="text-3xl font-semibold mb-4">Comments</h2>

          <form onSubmit={handleAddComment} className="mb-6 space-y-4">
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
              <ReactQuill
                theme="snow"
                value={newCommentContent}
                onChange={setNewCommentContent}
                className="bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your content here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Comment
            </button>
          </form>

          {comments?.length > 0 ? (
            <div className="space-y-4 prose m-auto  min-w-full">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-50 space-y-1 w-full">
                  <p className="font-semibold text-gray-700 m-0 text-xl">
                    {" "}
                    {comment.author}
                  </p>
                  <p className="text-gray-600 m-0"> {parse(comment.content)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
