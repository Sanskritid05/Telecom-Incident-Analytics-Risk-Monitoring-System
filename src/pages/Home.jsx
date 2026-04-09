import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-32 text-center px-6">

        {/* Glow Background (FIXED) */}
        <div className="pointer-events-none absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full -z-10"></div>

        {/* Heading */}
        <h1 className="text-6xl font-bold mb-6">
          Think in{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            SQL Patterns
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 mb-8 max-w-xl">
          Learn SQL through structured patterns & edge cases.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Start Learning Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-xl hover:scale-105 transition cursor-pointer"
          >
            Start Learning
          </button>

          {/* Explore Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            Explore
          </button>

        </div>
      </div>
    </div>
  );
}