export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-black/60">
      <h1 className="text-xl font-bold">PatternSQL</h1>
      <button className="bg-purple-600 px-4 py-2 rounded-lg">
        Login
      </button>
    </div>
  );
}