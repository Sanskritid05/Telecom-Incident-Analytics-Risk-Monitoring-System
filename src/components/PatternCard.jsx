export default function PatternCard({ title }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition border border-gray-700">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">
        Master this SQL pattern
      </p>

      <button className="bg-purple-600 px-4 py-2 rounded-lg">
        Start
      </button>
    </div>
  );
}