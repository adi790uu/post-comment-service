import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/post/all`
        );
        const sortedPosts = response.data.sort(
          (a: Post, b: Post) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts);
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
          {!posts ? (
            <p>No Posts available!</p>
          ) : (
            posts.map((post) => {
              const truncatedContent = post.content.replace(/<[^>]+>/g, "");
              const previewContent =
                truncatedContent.split(" ").slice(0, 15).join(" ") + "...";

              return (
                <div
                  key={post?.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    <Link to={`/post/${post?.id}`} className="hover:underline">
                      {post?.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(post?.date)}
                  </p>
                  <p className="text-sm text-gray-700 mt-3">{previewContent}</p>
                  <Link
                    to={`/post/${post?.id}`}
                    className="text-gray-500 tracking-wide text-sm rounded transition duration-200 mt-1 hover:underline"
                  >
                    Read More...
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
