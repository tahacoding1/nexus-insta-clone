import { useState, useEffect, useRef } from "react";
import { USERS, EXPLORE_IMGS } from "../data";
import { SearchIco, HeartIco, CloseIco, CommentIco, ShareIco, SaveIco } from "../components/icons";
import { VerifiedBadge } from "../components/icons";
import PostDetailModal from "../components/PostDetailModal";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const results =
    query.length > 0
      ? USERS.filter(
          (u) =>
            u.username.includes(query.toLowerCase()) ||
            u.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="max-w-[600px] mx-auto w-full">
      {/* Search bar */}
      <div className="sticky top-0 bg-transparent py-3 z-10">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-3xl px-4 py-3 backdrop-blur-xl shadow-sm">
          <span className="text-slate-400">
            <SearchIco />
          </span>
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, places, tags…"
            className="bg-transparent flex-1 text-white placeholder-gray-600 outline-none text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-500 hover:text-white w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-1 mt-1">
          {results.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-900 rounded-xl cursor-pointer transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-full p-[2px] shrink-0"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}
              >
                <div className="p-[1.5px] bg-black rounded-full w-full h-full">
                  <img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5">
                  <span className="text-sm font-semibold text-white">{u.username}</span>
                  {u.verified && <VerifiedBadge />}
                </div>
                <div className="text-xs text-gray-500">
                  {u.name} · {u.followers} followers
                </div>
              </div>
              <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          {!query && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Explore
            </p>
          )}
          {query && (
            <p className="text-gray-600 text-sm text-center py-8">
              No results for "{query}"
            </p>
          )}
          {!query && (
            <div className="grid grid-cols-3 gap-[3px]">
              {EXPLORE_IMGS.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedPost(img)}
                  className={`relative overflow-hidden cursor-pointer group rounded-[1.75rem] ${
                    i === 0 || i === 6 ? "col-span-2 row-span-2" : ""
                  }`}
                  style={{ aspectRatio: "1" }}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity rounded-[1.75rem]" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center gap-3">
                    <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <HeartIco f cls="w-4 h-4" />
                      {img.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  );
}
