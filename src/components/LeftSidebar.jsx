import { useState } from "react";
import { ME } from "../data";
import { NexusLogo, HomeIco, SearchIco, MsgIco, UserIco, SettingsIco, MoreIco } from "./icons";

const NAV_ITEMS = [
  { id: "home",     label: "Home",     icon: (a) => <HomeIco f={a} /> },
  { id: "search",   label: "Search",   icon: () => <SearchIco /> },
  { id: "messages", label: "Messages", icon: (a) => <MsgIco f={a} />, badge: 3 },
  { id: "profile",  label: "Profile",  icon: (a) => <UserIco f={a} /> },
  { id: "settings", label: "Settings", icon: () => <SettingsIco /> },
];

export default function LeftSidebar({ page, onNav, user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-24 xl:w-72 h-screen sticky top-0 px-3 py-5 glass-panel shrink-0">
      <div className="h-full flex flex-col justify-between">
        <div className="px-2 xl:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <NexusLogo />
          <span className="hidden xl:block text-2xl font-black text-white tracking-tight">
            NEXUS
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`flex items-center gap-4 px-4 py-4 rounded-3xl w-full transition-all relative ${
                page === item.id
                  ? "text-indigo-200 font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={page === item.id ? { background: "rgba(99,102,241,0.16)" } : {}}
            >
              <span className="shrink-0">{item.icon(page === item.id)}</span>
              <span className="hidden xl:block text-sm">{item.label}</span>
              {item.badge && (
                <span className="absolute xl:static top-2 right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ml-auto font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile at bottom */}
      <div className="mt-auto px-3 xl:px-6 pb-6">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 w-full px-4 py-4 bg-white/5 rounded-3xl hover:bg-white/10 cursor-pointer transition-colors"
          >
            <img
              src={ME.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="hidden xl:block flex-1 min-w-0 text-left">
              <div className="text-sm font-semibold text-white truncate">{user?.username || ME.username}</div>
              <div className="text-xs text-slate-400 truncate">{ME.name}</div>
            </div>
            <span className="hidden xl:block text-gray-600">
              <MoreIco />
            </span>
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute bottom-full left-0 right-0 bg-slate-950/95 rounded-3xl border border-slate-800 py-2 mb-2 shadow-2xl">
              <button
                onClick={() => {
                  onLogout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 text-sm transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </aside>
  );
}
