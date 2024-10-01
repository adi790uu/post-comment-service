import { Link, useNavigate } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "First Post",
    description:
      "This is the description of the first post. It gives a brief overview of the post content.",
  },
  {
    id: 2,
    title: "Second Post",
    description:
      "This is the description of the second post. It gives a brief overview of the post content.",
  },
  {
    id: 3,
    title: "Third Post",
    description:
      "This is the description of the third post. It gives a brief overview of the post content.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/create-post");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md py-4">
        <div className="container px-4 flex justify-between mx-auto">
          <h1 className="text-3xl text-slate-900 font-bold">
            Post Comment Service
          </h1>
          <button
            onClick={handleRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Create Post
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Recent Posts
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link
                to="/post/12"
                className="text-gray-500 tracking-wide rounded transition duration-200"
              >
                Read More...
              </Link>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white shadow-md py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 Post Comment Service. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
