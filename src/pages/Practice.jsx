import Sidebar from "../layout/Sidebar";
import SQLPanel from "../components/SQLPanel";
import Level2Modal from "../components/Level2Modal";
import { useState } from "react";

export default function Practice() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="p-8 w-full">
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">
              Problem
            </h2>
            <p>Find gaps in login dates</p>
          </div>

          <SQLPanel onSubmit={() => setShow(true)} />
        </div>

        {show && <Level2Modal />}
      </div>
    </div>
  );
}