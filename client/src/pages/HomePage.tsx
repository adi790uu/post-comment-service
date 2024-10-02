import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/post/all");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8 h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Recent Posts
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const truncatedContent = post.content.replace(/<[^>]+>/g, "");
            const previewContent =
              truncatedContent.split(" ").slice(0, 15).join(" ") + "...";

            return (
              <div key={post?.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {post?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(post?.date)}
                </p>
                <p className="text-sm text-gray-700 mt-1">{previewContent}</p>
                <Link
                  to={`/post/${post?.id}`}
                  className="text-gray-500 tracking-wide rounded transition duration-200 mt-1"
                >
                  Read More...
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
