export default function SQLPanel({ onSubmit }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <textarea
        className="w-full h-40 bg-black text-green-400 p-4 rounded-lg"
        defaultValue="SELECT * FROM table;"
      />

      <div className="flex gap-3 mt-4">
        <button className="border px-4 py-2 rounded">
          Run
        </button>

        <button
          onClick={onSubmit}
          className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}