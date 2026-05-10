import { NexusLogo, HeartIco, MsgIco, SettingsIco } from "./icons";

const TITLES = { search: "Search", messages: "Messages", profile: "Profile", settings: "Settings" };

export default function MobileHeader({ page, onNav }) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between backdrop-blur-xl">
      {page === "home" ? (
        <>
          <div className="flex items-center gap-2 cursor-pointer">
            <NexusLogo />
            <span className="text-lg font-black text-white tracking-tight">NEXUS</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-colors">
              <HeartIco f={false} cls="w-6 h-6" />
            </button>
            <button
              className="relative p-2 hover:bg-gray-900 rounded-full text-white transition-colors"
              onClick={() => onNav("messages")}
            >
              <MsgIco f={false} />
              <span className="absolute top-1 right-1 bg-blue-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between w-full gap-2">
          <span className="font-bold text-white text-lg">{TITLES[page] || page}</span>
          {page === "profile" && (
            <button
              className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors"
              onClick={() => onNav("settings")}
            >
              <SettingsIco />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
