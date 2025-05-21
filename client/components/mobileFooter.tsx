import { FaHome, FaSearch, FaPlus, FaBell, FaUser } from "react-icons/fa";

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--background)] text-white flex justify-around items-center py-3 sm:hidden z-50 border-t border-gray-700 rounded-sm">
      <button className="flex flex-col items-center text-sm">
        <FaHome size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FaSearch size={20} />
        <span className="text-xs mt-1">Search</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FaPlus size={20} />
        <span className="text-xs mt-1">Post</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FaBell size={20} />
        <span className="text-xs mt-1">Alerts</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FaUser size={20} />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}
