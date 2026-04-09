import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 p-6 space-y-4 min-h-screen">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Patterns</Link>
      <Link to="/practice">Practice</Link>
      <Link to="/progress">Progress</Link>
    </div>
  );
}