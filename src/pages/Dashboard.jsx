import Sidebar from "../layout/Sidebar";
import PatternCard from "../components/PatternCard";

export default function Dashboard() {
  const patterns = [
    "Gap Detection",
    "Rolling Average",
    "Cohort Analysis",
    "Window Functions",
  ];

  return (
    <div className="flex bg-black text-white">
      <Sidebar />

      <div className="p-8 grid grid-cols-3 gap-6 w-full">
        {patterns.map((p, i) => (
          <PatternCard key={i} title={p} />
        ))}
      </div>
    </div>
  );
}