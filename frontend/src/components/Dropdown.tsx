import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setOpen(!open)}
      >
        Options
      </button>

      {open && (
        <div className="absolute mt-2 w-56 bg-white shadow-lg rounded-md">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Settings
          </a>
        </div>
      )}
    </div>
  );
}
