import { useState } from "react";
import { ME, USERS } from "../data";
import { VerifiedBadge, MoreIco } from "./icons";

const FOOTER_LINKS = ["About", "Help", "Privacy", "Terms", "API", "Jobs", "Locations"];

export default function SuggestedUsers() {
  const [followed, setFollowed] = useState({});

  return (
    <div className="hidden xl:block w-80 shrink-0 pl-10 pt-8">
      {/* Current user */}
      <div className="flex items-center gap-3 mb-6">
        <img src={ME.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">{ME.username}</div>
          <div className="text-xs text-gray-500 truncate">{ME.name}</div>
        </div>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Switch
        </button>
      </div>

      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Suggested
        </span>
        <button className="text-xs font-semibold text-white hover:text-gray-300 transition-colors">
          See all
        </button>
      </div>

      {/* User list */}
      <div className="space-y-4">
        {USERS.slice(0, 5).map((u) => (
          <div key={u.id} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full p-[2px] shrink-0"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}
            >
              <div className="p-[1.5px] bg-black rounded-full w-full h-full">
                <img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-semibold text-white truncate">{u.username}</span>
                {u.verified && <VerifiedBadge />}
              </div>
              <div className="text-xs text-gray-500">Suggested for you</div>
            </div>
            <button
              onClick={() => setFollowed((f) => ({ ...f, [u.id]: !f[u.id] }))}
              className={`text-xs font-semibold transition-colors ${
                followed[u.id]
                  ? "text-gray-500 hover:text-gray-400"
                  : "text-blue-400 hover:text-blue-300"
              }`}
            >
              {followed[u.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-8 text-gray-700 text-[11px] leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
          {FOOTER_LINKS.map((t) => (
            <span key={t} className="cursor-pointer hover:text-gray-500 transition-colors">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-1">© 2025 NEXUS</div>
      </div>
    </div>
  );
}
