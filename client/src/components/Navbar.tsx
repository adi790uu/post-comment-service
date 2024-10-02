import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/create-post");
  };
  return (
    <header className="bg-slate-600 border-b-2 shadow-md py-4">
      <div className="container px-4 flex justify-between mx-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl text-white font-bold cursor-pointer"
        >
          Post Comment Service
        </h1>
        <button
          onClick={handleRedirect}
          className=" text-white px-4 py-2 rounded hover:bg-slate-700 transition duration-200"
        >
          Create Post
        </button>
      </div>
    </header>
  );
};

export default Navbar;
