import { useState } from "react";
import { ME, POSTS_DATA, USERS } from "../data";
import { GridIco, SaveIco, TagIco, HeartIco, PlusIco, SettingsIco } from "../components/icons";
import { VerifiedBadge } from "../components/icons";
import PostCard from "../components/PostCard";
import UserListModal from "../components/UserListModal";
import StoryViewer from "../components/StoryViewer";

const HIGHLIGHT_LABELS = ["Travel", "Dev", "Food", "Music"];

export default function ProfilePage({ onNav, viewingUser = null }) {
  const currentUser = viewingUser || ME;
  const isOwnProfile = !viewingUser;
  const [tab, setTab] = useState("posts");
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(parseInt(ME.followers));
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showStory, setShowStory] = useState(null);

  const savedPosts = POSTS_DATA.filter((p) => p.saved);

  const handleFollowToggle = () => {
    setFollowing((f) => !f);
    setFollowerCount((n) => (following ? n - 1 : n + 1));
  };

  return (
    <div className="max-w-[600px] mx-auto w-full pb-8">
      {/* Profile header */}
      <div className="flex items-start gap-6 py-6 px-2">
        <div className="shrink-0">
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-full p-[3px]"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}
          >
            <div className="p-[2px] bg-black rounded-full w-full h-full">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Username row */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-white font-semibold text-xl">{currentUser.username}</span>
            {currentUser.verified && <VerifiedBadge />}
          </div>

          {/* Action buttons */}
          {!isOwnProfile && (
            <div className="flex gap-2 flex-wrap mb-4">
              <button
                onClick={handleFollowToggle}
                className={`px-5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  following
                    ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
                    : "text-white hover:opacity-90"
                }`}
                style={following ? {} : { background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
              >
                {following ? "Following" : "Follow"}
              </button>
              <button className="px-5 py-1.5 rounded-xl text-sm font-semibold bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">
                Message
              </button>
            </div>
          )}
          {isOwnProfile && (
            <div className="flex gap-2 flex-wrap mb-4">
              <button
                onClick={() => onNav?.("settings")}
                className="px-5 py-1.5 rounded-xl text-sm font-semibold bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-6 mb-3">
            <button
              onClick={() => setShowFollowers(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-white font-bold text-sm text-center">{followerCount.toLocaleString()}</div>
              <div className="text-gray-400 text-xs text-center capitalize">followers</div>
            </button>
            <div>
              <div className="text-white font-bold text-sm text-center">{currentUser.posts}</div>
              <div className="text-gray-400 text-xs text-center capitalize">posts</div>
            </div>
            <button
              onClick={() => setShowFollowing(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-white font-bold text-sm text-center">{currentUser.following}</div>
              <div className="text-gray-400 text-xs text-center capitalize">following</div>
            </button>
          </div>

          {/* Bio */}
          <div className="text-sm font-semibold text-white">{currentUser.name}</div>
          <div className="text-sm text-gray-400 mt-0.5 leading-relaxed">{currentUser.bio}</div>
        </div>
      </div>

      {/* Story highlights */}
      <div
        className="flex gap-4 overflow-x-auto px-2 pb-4 border-b border-gray-900"
        style={{ scrollbarWidth: "none" }}
      >
        {HIGHLIGHT_LABELS.map((label, i) => (
          <div
            key={i}
            onClick={() => setShowStory(`https://picsum.photos/seed/hl${i + 1}/600/900`)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
          >
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 overflow-hidden flex items-center justify-center bg-gray-900">
              <img
                src={`https://picsum.photos/seed/hl${i + 1}/100/100`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600">
            <PlusIco />
          </div>
          <span className="text-xs text-gray-400">New</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-900">
        {[
          ["posts", <GridIco key="grid" />],
          ["saved", <SaveIco key="save" f={false} />],
          ["tagged", <TagIco key="tag" />],
        ].map(([t, icon]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
              tab === t
                ? "text-blue-400 border-t-2 border-blue-400 -mt-[1px]"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            <span className={tab === t ? "text-blue-400" : "text-gray-600"}>{icon}</span>
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-3 gap-[2px] mt-[2px]">
        {(tab === "saved" ? savedPosts : POSTS_DATA).map((p) => (
          <div
            key={p.id}
            className="relative overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "1" }}
          >
            <img
              src={p.image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-bold flex items-center gap-1">
                <HeartIco f cls="w-4 h-4" />
                {p.likes.toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        {tab === "saved" && savedPosts.length === 0 && (
          <div className="col-span-3 py-16 text-center text-gray-600 text-sm">
            No saved posts yet
          </div>
        )}
        {tab === "tagged" && (
          <div className="col-span-3 py-16 text-center text-gray-600 text-sm">
            No tagged posts yet
          </div>
        )}
      </div>

      {/* Modals */}
      <UserListModal
        isOpen={showFollowers}
        onClose={() => setShowFollowers(false)}
        title="Followers"
        onUserClick={() => {}}
      />
      <UserListModal
        isOpen={showFollowing}
        onClose={() => setShowFollowing(false)}
        title="Following"
        onUserClick={() => {}}
      />
      <StoryViewer
        isOpen={!!showStory}
        onClose={() => setShowStory(null)}
        image={showStory}
      />
    </div>
  );
}
