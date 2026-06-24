import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchPastReviews();
    console.log("token: ", token);
  }, [token]);

  

  return (
    <>
      <nav className="w-full max-w-screen-xl mx-auto bg-gray-800 p-4 shadow-lg border-b-2 border-white">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-blue-400 cursor-pointer hover:text-blue-500 transition duration-300">
            AI Code Reviewer
          </h1>
          <div className="flex items-center space-x-6">
            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Dashboard
            </button>
            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200">
              Logout
            </button>
          </div>
        </div>
      </nav>

      
    </>
  );
}

export default App;