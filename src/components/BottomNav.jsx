import { HomeIco, SearchIco, MsgIco, UserIco, SettingsIco } from "./icons";

const ITEMS = [
  { id: "home",     icon: (a) => <HomeIco f={a} /> },
  { id: "search",   icon: () => <SearchIco /> },
  { id: "messages", icon: (a) => <MsgIco f={a} />, badge: 3 },
  { id: "profile",  icon: (a) => <UserIco f={a} /> },
  { id: "settings", icon: () => <SettingsIco /> },
];

export default function BottomNav({ page, onNav }) {
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-slate-950/95 border border-slate-800 rounded-3xl z-50 flex items-center justify-around px-4 py-3 shadow-2xl">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNav(item.id)}
          className={`relative p-3 transition-all ${
            page === item.id
              ? "text-blue-400 scale-110"
              : "text-gray-500 hover:text-white"
          }`}
        >
          {item.icon(page === item.id)}
          {item.badge && page !== item.id && (
            <span className="absolute top-1.5 right-1.5 bg-indigo-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
