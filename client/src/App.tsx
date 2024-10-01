import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostCreationPage from "./pages/PostCreationPage";
import PostDetailsPage from "./pages/PostDetailsPage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<PostCreationPage />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
