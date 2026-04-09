import Sidebar from "../layout/Sidebar";

export default function Progress() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="p-8 w-full">
        <h2 className="text-2xl font-bold mb-6">
          Progress Dashboard
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            Patterns: 3/10
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            Level 2: 45%
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            Solved: 25
          </div>
        </div>
      </div>
    </div>
  );
}