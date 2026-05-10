import { useState } from "react";
import { USERS } from "../data";
import { SearchIco, CloseIco } from "./icons";
import { VerifiedBadge } from "./icons";

export default function UserListModal({ isOpen, onClose, title, onUserClick, isFollowed = () => false }) {
  const [query, setQuery] = useState("");
  const filtered = query
    ? USERS.filter((u) =>
        u.username.toLowerCase().includes(query.toLowerCase())
      )
    : USERS;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-900 text-center font-bold text-lg relative">
          {title}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <CloseIco />
          </button>
        </div>
        <div className="p-3 border-b border-gray-900 bg-black">
          <div className="bg-gray-900 rounded-lg flex items-center px-3 py-2 border border-gray-800">
            <SearchIco />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-white text-sm ml-2 outline-none w-full placeholder-gray-600"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">No users found.</div>
          )}
          {filtered.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                onUserClick(u);
                onClose();
              }}
              className="flex items-center justify-between p-4 hover:bg-gray-900 cursor-pointer transition-colors border-b border-gray-900 last:border-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full border border-gray-800"
                />
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1">
                    {u.username} {u.verified && <VerifiedBadge />}
                  </div>
                  <div className="text-xs text-gray-500">{u.name}</div>
                </div>
              </div>
              <button className={`text-sm font-semibold hover:opacity-80 ${isFollowed(u) ? 'text-gray-400' : 'text-blue-400 hover:text-blue-300'}`}>
                {isFollowed(u) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}