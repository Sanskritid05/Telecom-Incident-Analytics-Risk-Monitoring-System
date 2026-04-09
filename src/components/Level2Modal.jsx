export default function Level2Modal() {
  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl">
      <h3 className="text-xl font-bold mb-2">
        Level 2 Unlocked 🚀
      </h3>

      <div className="flex gap-2 mb-4">
        <span className="bg-white/20 px-3 py-1 rounded-full">
          NULL handling
        </span>
        <span className="bg-white/20 px-3 py-1 rounded-full">
          Remove duplicates
        </span>
      </div>

      <button className="bg-black px-4 py-2 rounded">
        Improve Query
      </button>
    </div>
  );
}