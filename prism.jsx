import { useState, useEffect, useRef } from "react";

/* ── DATA ─────────────────────────────────────────────────────── */
const ME = {
  id: 0, username: "yourname", name: "Your Name",
  avatar: "https://i.pravatar.cc/150?img=10",
  followers: "2.1K", following: 418, posts: 12,
  bio: "🌊 Just vibing | 📍 Earth | 💙 Blue everything",
  verified: false,
};

const USERS = [
  { id: 1, username: "alex_rivera", name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?img=1", followers: "12.4K", following: 892, posts: 47, bio: "✨ Digital Artist | 📍 NYC | Creating worlds pixel by pixel", verified: true },
  { id: 2, username: "sara_moon", name: "Sara Moon", avatar: "https://i.pravatar.cc/150?img=5", followers: "8.2K", following: 341, posts: 23, bio: "🌙 Night owl | 📸 Photography | Catching golden hours", verified: false },
  { id: 3, username: "james_k", name: "James K.", avatar: "https://i.pravatar.cc/150?img=3", followers: "45.1K", following: 212, posts: 156, bio: "🚀 Entrepreneur | 💡 Building the future | Speaker", verified: true },
  { id: 4, username: "mia_chen", name: "Mia Chen", avatar: "https://i.pravatar.cc/150?img=9", followers: "6.7K", following: 503, posts: 34, bio: "🎨 Art director | 🌸 Seoul → LA | Visual storyteller", verified: false },
  { id: 5, username: "dev_noor", name: "Noor Dev", avatar: "https://i.pravatar.cc/150?img=7", followers: "3.2K", following: 189, posts: 19, bio: "💻 Full-stack dev | ⚡ Open source | Coffee = code", verified: false },
  { id: 6, username: "lena_w", name: "Lena W.", avatar: "https://i.pravatar.cc/150?img=11", followers: "19.8K", following: 670, posts: 89, bio: "🎵 Music producer | 🎧 Beats and vibes | LA", verified: true },
];

const STORIES_DATA = [
  { id: 1, user: USERS[0], seen: false },
  { id: 2, user: USERS[1], seen: false },
  { id: 3, user: USERS[2], seen: true },
  { id: 4, user: USERS[3], seen: false },
  { id: 5, user: USERS[4], seen: true },
  { id: 6, user: USERS[5], seen: false },
];

const POSTS_DATA = [
  { id: 1, user: USERS[0], image: "https://picsum.photos/seed/p101/600/600", caption: "Lost in the city lights ✨ Every corner tells a story. This place never sleeps and honestly neither do I anymore 🌆", likes: 1423, comments: 87, saved: false, liked: false, time: "2h", commentsList: [{ user: USERS[1], text: "Absolutely stunning! 😍" }, { user: USERS[2], text: "The lighting here is perfect" }] },
  { id: 2, user: USERS[1], image: "https://picsum.photos/seed/p202/600/600", caption: "Golden hour never misses 🌅 Caught this on my morning run. Sometimes waking up early is totally worth it.", likes: 892, comments: 43, saved: true, liked: true, time: "4h", commentsList: [{ user: USERS[3], text: "Goals! 🔥" }] },
  { id: 3, user: USERS[2], image: "https://picsum.photos/seed/p303/600/600", caption: "New chapter begins today 🚀 Excited to share what we've been building. Stay tuned for the big announcement!", likes: 3201, comments: 156, saved: false, liked: false, time: "6h", commentsList: [{ user: USERS[0], text: "Can't wait! 🙌" }, { user: USERS[4], text: "We're ready for it!" }] },
  { id: 4, user: USERS[3], image: "https://picsum.photos/seed/p404/600/600", caption: "Art is not what you see, but what you make others see 🎨 New series dropping this week.", likes: 567, comments: 31, saved: false, liked: false, time: "8h", commentsList: [] },
  { id: 5, user: USERS[4], image: "https://picsum.photos/seed/p505/600/600", caption: "shipped it at 3am like a true dev 💻⚡ The bug took 6 hours. The fix was one line. Classic.", likes: 2104, comments: 98, saved: false, liked: false, time: "12h", commentsList: [{ user: USERS[1], text: "This hits too close to home 😭" }] },
  { id: 6, user: USERS[5], image: "https://picsum.photos/seed/p606/600/600", caption: "Studio session went til sunrise 🎵 New track coming soon. This one's different.", likes: 4890, comments: 234, saved: true, liked: true, time: "1d", commentsList: [] },
];

const EXPLORE_IMGS = [
  { id: 101, src: "https://picsum.photos/seed/ex11/600/600", likes: 120 }, { id: 102, src: "https://picsum.photos/seed/ex22/600/600", likes: 340 }, { id: 103, src: "https://picsum.photos/seed/ex33/600/600", likes: 89 },
  { id: 104, src: "https://picsum.photos/seed/ex44/600/600", likes: 567 }, { id: 105, src: "https://picsum.photos/seed/ex55/600/600", likes: 22 }, { id: 106, src: "https://picsum.photos/seed/ex66/600/600", likes: 999 },
  { id: 107, src: "https://picsum.photos/seed/ex77/600/600", likes: 44 }, { id: 108, src: "https://picsum.photos/seed/ex88/600/600", likes: 111 }, { id: 109, src: "https://picsum.photos/seed/ex99/600/600", likes: 673 },
];

const CONVOS_INIT = [
  { id: 1, user: USERS[0], lastMsg: "That photo was amazing! 🔥", time: "2m", unread: 2, online: true },
  { id: 2, user: USERS[1], lastMsg: "Sure, let's meet tomorrow", time: "15m", unread: 0, online: true },
  { id: 3, user: USERS[2], lastMsg: "Check out this link!", time: "1h", unread: 1, online: false },
  { id: 4, user: USERS[3], lastMsg: "Loved your latest post ❤️", time: "3h", unread: 0, online: false },
  { id: 5, user: USERS[4], lastMsg: "haha same 😂", time: "1d", unread: 0, online: true },
];

const MSGS_INIT = {
  1: [
    { id: 1, from: 1, text: "Hey! Just saw your story 👋", time: "10:30 AM" },
    { id: 2, from: 0, text: "Haha yeah, it was a great day!", time: "10:31 AM" },
    { id: 3, from: 1, text: "That photo was amazing! 🔥", time: "10:32 AM" },
  ],
  2: [
    { id: 1, from: 2, text: "Are you free this weekend?", time: "Yesterday" },
    { id: 2, from: 0, text: "Yeah I think so, why?", time: "Yesterday" },
    { id: 3, from: 2, text: "Sure, let's meet tomorrow", time: "Yesterday" },
  ],
  3: [{ id: 1, from: 3, text: "Check out this link!", time: "2:00 PM" }],
  4: [{ id: 1, from: 4, text: "Loved your latest post ❤️", time: "Morning" }],
  5: [{ id: 1, from: 0, text: "I know right?", time: "Yesterday" }, { id: 2, from: 5, text: "haha same 😂", time: "Yesterday" }],
};

const AUTO_RESP = ["That's so cool 😄","Haha yeah totally!","No way!! 😱","Love that 💙","Let's catch up soon!","Okay tell me more","Yesss!! 🙌","Wait really??","That's amazing honestly","💙💙💙"];

/* ── ICONS ─────────────────────────────────────────────────────── */
const HomeIco = ({ f }) => <svg viewBox="0 0 24 24" className="w-6 h-6" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SearchIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const SettingsIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const LogOutIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const MenuIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const MsgIco = ({ f }) => <svg viewBox="0 0 24 24" className="w-6 h-6" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const UserIco = ({ f }) => <svg viewBox="0 0 24 24" className="w-6 h-6" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HeartIco = ({ f, cls }) => <svg viewBox="0 0 24 24" className={cls || "w-7 h-7"} fill={f ? "currentColor" : "none"} stroke={f ? "none" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const CommentIco = () => <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const ShareIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const SaveIco = ({ f }) => <svg viewBox="0 0 24 24" className="w-7 h-7" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>;
const SendIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const BackIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const MoreIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>;
const CamIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const CheckIco = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const PlusIco = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const GridIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const TagIco = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const CloseIco = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const NexusLogo = () => (
  <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
    <polygon points="18,3 33,30 3,30" fill="url(#lg)"/>
    <polygon points="18,10 26,27 10,27" fill="rgba(0,0,0,0.35)"/>
  </svg>
);

const VerifiedBadge = () => (
  <svg className="w-4 h-4 text-blue-400 inline-block ml-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);


/* ── MODAL COMPONENTS (FIXED CODE) ───────────────────────────────────── */

// Story Viewer (Full Screen)
const StoryViewer = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <button onClick={onClose} className="text-white p-2 bg-black/50 rounded-full hover:bg-black/80">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <img src={image} alt="Story" className="max-w-full max-h-full object-contain" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/60"></div>
    </div>
  );
};

// Post Detail Modal (For Search Images)
const PostDetailModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 z-20 text-white p-2 bg-black/50 rounded-full hover:bg-gray-800">
             <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-[#121212] flex items-center justify-center p-2">
          <img src={post.src} alt="Post" className="max-h-[50vh] md:max-h-full object-contain" />
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/2 flex flex-col bg-black">
          <div className="p-4 border-b border-gray-900 flex items-center gap-3">
            <img src={ME.avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-sm">{ME.username}</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
             <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-sm">{ME.username}</span>
                <span className="text-sm text-gray-300">Loving this vibe! ✨</span>
             </div>
          </div>
          <div className="p-4 border-t border-gray-900">
            <div className="flex items-center gap-4 mb-3">
              <button onClick={() => setLiked(!liked)} className={liked ? "text-red-500" : "text-white"}>
                 <svg viewBox="0 0 24 24" className="w-7 h-7" fill={liked ? "currentColor" : "none"} stroke={liked ? "none" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
              <button className="text-white"><CommentIco /></button>
              <button className="text-white"><ShareIco /></button>
              <div className="flex-1"></div>
              <button onClick={() => setSaved(!saved)} className={saved ? "text-blue-400" : "text-white"}><SaveIco f={saved} /></button>
            </div>
            <div className="font-bold text-sm mb-1">{post.likes} likes</div>
            <div className="text-xs text-gray-500 uppercase font-bold">2 HOURS AGO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User List Modal (For Followers/Following/New Chat)
const UserListModal = ({ isOpen, onClose, title, users, onUserClick }) => {
  const [query, setQuery] = useState("");
  const filtered = query ? users.filter(u => u.username.toLowerCase().includes(query.toLowerCase())) : users;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-900 text-center font-bold text-lg relative">
          {title}
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
             <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="p-3 border-b border-gray-900 bg-black">
          <div className="bg-gray-900 rounded-lg flex items-center px-3 py-2 border border-gray-800">
             <SearchIco />
             <input 
               value={query} 
               onChange={e => setQuery(e.target.value)}
               placeholder="Search" 
               className="bg-transparent text-white text-sm ml-2 outline-none w-full placeholder-gray-600"
             />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && <div className="p-8 text-center text-gray-500 text-sm">No users found.</div>}
          {filtered.map(u => (
            <div key={u.id} onClick={() => { onUserClick(u); onClose(); }} className="flex items-center justify-between p-4 hover:bg-gray-900 cursor-pointer transition-colors border-b border-gray-900 last:border-0">
              <div className="flex items-center gap-3">
                <img src={u.avatar} alt="" className="w-12 h-12 rounded-full border border-gray-800" />
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1">
                    {u.username} {u.verified && <VerifiedBadge />}
                  </div>
                  <div className="text-xs text-gray-500">{u.name}</div>
                </div>
              </div>
              <button className="text-blue-400 text-sm font-semibold hover:text-blue-300">Follow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── EXISTING COMPONENTS (UPDATED) ─────────────────────────────── */

/* ── STORY CIRCLE ───────────────────────────────────────────────── */
function StoryCircle({ story, seen: initialSeen, onClick }) {
  const [seen, setSeen] = useState(initialSeen);
  const handleClick = () => {
    if (!seen) setSeen(true);
    if (onClick) onClick(story);
  };
  return (
    <button className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0" onClick={handleClick}>
      <div className={`p-[2px] rounded-full transition-all duration-300 ${seen ? "bg-gray-700" : ""}`}
        style={seen ? {} : { background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #06b6d4)" }}>
        <div className="p-[2px] bg-black rounded-full">
          <img src={story.user.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
        </div>
      </div>
      <span className="text-xs text-gray-400 truncate w-16 text-center">{story.user.username}</span>
    </button>
  );
}

function AddStoryCircle({ onClick }) {
  return (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0" onClick={onClick}>
      <div className="relative">
        <div className="w-[60px] h-[60px] rounded-full border-2 border-gray-700 overflow-hidden">
          <img src={ME.avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
          <PlusIco />
        </div>
      </div>
      <span className="text-xs text-gray-400 w-16 text-center">Your story</span>
    </div>
  );
}

/* ── POST CARD (Fixed Comments) ─────────────────────────────────── */
function PostCard({ postInit }) {
  const [post, setPost] = useState(postInit);
  const [showComments, setShowComments] = useState(true); // Default true for better UX or keep false
  const [commentText, setCommentText] = useState("");
  const [heartAnim, setHeartAnim] = useState(false);
  const [dblHeartVis, setDblHeartVis] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 350);
    setPost(p => ({ ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }));
  };

  const dblClickLike = () => {
    if (!post.liked) setPost(p => ({ ...p, liked: true, likes: p.likes + 1 }));
    setDblHeartVis(true);
    setTimeout(() => setDblHeartVis(false), 900);
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment = { user: ME, text: commentText };
    setPost(p => ({
      ...p,
      commentsList: [newComment, ...p.commentsList], // Add to top
      comments: p.comments + 1,
    }));
    setCommentText("");
    setShowComments(true); // Ensure it's open
  };

  const capLen = 100;
  const longCap = post.caption.length > capLen;

  return (
    <article className="border-b border-gray-900 pb-3 mb-1">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full p-[2px] shrink-0 cursor-pointer"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}>
            <div className="p-[1.5px] bg-black rounded-full w-full h-full">
              <img src={post.user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors leading-none">{post.user.username}</span>
              {post.user.verified && <VerifiedBadge />}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{post.time} ago</div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white p-1 transition-colors"><MoreIco /></button>
      </div>

      {/* Image */}
      <div className="relative cursor-pointer select-none overflow-hidden rounded-sm" onDoubleClick={dblClickLike}>
        <img src={post.image} alt="" className="w-full object-cover" style={{ maxHeight: 480 }} loading="lazy" />
        {dblHeartVis && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-blue-400" style={{ animation: "heartPop 0.8s ease-out forwards" }}>
              <HeartIco f cls="w-24 h-24 drop-shadow-xl" />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 pb-1">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className={`transition-transform duration-200 ${heartAnim ? "scale-125" : "scale-100"}`}>
            <span className={`block transition-colors ${post.liked ? "text-blue-400" : "text-white"}`}>
              <HeartIco f={post.liked} />
            </span>
          </button>
          <button onClick={() => setShowComments(s => !s)} className="text-white hover:text-blue-400 transition-colors">
            <CommentIco />
          </button>
          <button className="text-white hover:text-blue-400 transition-colors"><ShareIco /></button>
        </div>
        <button onClick={() => setPost(p => ({ ...p, saved: !p.saved }))}
          className={`transition-colors ${post.saved ? "text-blue-400" : "text-white hover:text-blue-400"}`}>
          <SaveIco f={post.saved} />
        </button>
      </div>

      {/* Likes */}
      <div className="text-sm font-semibold text-white">{post.likes.toLocaleString()} likes</div>

      {/* Caption */}
      <div className="text-sm text-gray-200 mt-1 leading-relaxed">
        <span className="font-semibold text-white mr-1">{post.user.username}</span>
        {longCap && !expanded ? (
          <>{post.caption.slice(0, capLen)}… <button className="text-gray-500 hover:text-gray-300 text-xs" onClick={() => setExpanded(true)}>more</button></>
        ) : post.caption}
      </div>

      {/* Comments toggle */}
      {post.comments > 0 && (
        <button className="text-sm text-gray-500 hover:text-gray-400 mt-1 transition-colors"
          onClick={() => setShowComments(s => !s)}>
          {showComments ? "Hide" : `View all ${post.comments} comments`}
        </button>
      )}

      {/* Comments list */}
      {showComments && (
        <div className="mt-2 space-y-1.5">
          {post.commentsList.map((c, i) => (
            <div key={i} className="text-sm text-gray-200 animate-fadeIn">
              <span className="font-semibold text-white mr-1">{c.user.username}</span>{c.text}
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="flex items-center gap-2 mt-3 border-t border-gray-900 pt-3">
        <img src={ME.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addComment()}
          placeholder="Add a comment…"
          className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-700 outline-none"
        />
        {commentText && (
          <button onClick={addComment} className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">Post</button>
        )}
      </div>
    </article>
  );
}

/* ── HOME PAGE ──────────────────────────────────────────────────── */
function HomePage({ onStoryClick }) {
  return (
    <div className="max-w-[480px] mx-auto w-full">
      {/* Stories strip */}
      <div className="flex gap-4 overflow-x-auto py-4 border-b border-gray-900 mb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <AddStoryCircle onClick={() => alert("Open Camera")} />
        {STORIES_DATA.map(s => <StoryCircle key={s.id} story={s} seen={s.seen} onClick={onStoryClick} />)}
      </div>
      {/* Feed */}
      {POSTS_DATA.map(p => <PostCard key={p.id} postInit={p} />)}
    </div>
  );
}

/* ── SEARCH PAGE (UPDATED) ────────────────────────────────────────── */
function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); // Important: State for Modal

  const results = query.length > 0
    ? USERS.filter(u => u.username.includes(query.toLowerCase()) || u.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="max-w-[600px] mx-auto w-full">
      {/* Search bar */}
      <div className="sticky top-0 bg-black py-3 z-10">
        <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5">
          <span className="text-gray-500"><SearchIco /></span>
          <input
            autoFocus // Auto focus added
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people, places, tags…"
            className="bg-transparent flex-1 text-white placeholder-gray-600 outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-500 hover:text-white w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold transition-colors">✕</button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-1 mt-1">
          {results.map(u => (
            <div key={u.id} className="flex items-center gap-3 p-3 hover:bg-gray-900 rounded-xl cursor-pointer transition-colors group">
              <div className="w-12 h-12 rounded-full p-[2px] shrink-0" style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}>
                <div className="p-[1.5px] bg-black rounded-full w-full h-full">
                  <img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5">
                  <span className="text-sm font-semibold text-white">{u.username}</span>
                  {u.verified && <VerifiedBadge />}
                </div>
                <div className="text-xs text-gray-500">{u.name} · {u.followers} followers</div>
              </div>
              <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">Follow</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          {!query && <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Explore</p>}
          {query && <p className="text-gray-600 text-sm text-center py-8">No results for "{query}"</p>}
          {!query && (
            <div className="grid grid-cols-3 gap-[3px]">
              {EXPLORE_IMGS.map((img) => (
                <div key={img.id}
                  className="relative overflow-hidden cursor-pointer group aspect-square" // Added aspect-square
                  onClick={() => setSelectedPost(img)}> {/* CLICK HANDLER ADDED */}
                  <img src={img.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="text-white text-sm font-bold flex items-center gap-1">
                      <HeartIco f cls="w-4 h-4" />{img.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* MODAL AT BOTTOM */}
      <PostDetailModal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} post={selectedPost} />
    </div>
  );
}

/* ── MESSAGES PAGE (UPDATED) ──────────────────────────────────────── */
function MessagesPage({ onProfileClick }) {
  const [convos, setConvos] = useState(CONVOS_INIT);
  const [msgs, setMsgs] = useState(MSGS_INIT);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  
  // NEW STATE FOR NEW CHAT MODAL
  const [showUserList, setShowUserList] = useState(false); 
  
  const bottomRef = useRef(null);
  const activeConvo = convos.find(c => c.id === activeId);
  const activeMsgs = msgs[activeId] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMsgs, activeId, typing]);

  const handleNewChat = (user) => {
    // Check if convo exists, if not create dummy one
    let existing = convos.find(c => c.user.id === user.id);
    if (!existing) {
      const newId = Date.now();
      const newConvo = { id: newId, user: user, lastMsg: "Start chatting...", time: "Now", unread: 0, online: true };
      setConvos(prev => [newConvo, ...prev]);
      setMsgs(prev => ({ ...prev, [newId]: [] }));
      setActiveId(newId);
    } else {
      setActiveId(existing.id);
    }
  };

  const openConvo = (id) => {
    setActiveId(id);
    setConvos(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const sendMsg = () => {
    if (!input.trim() || !activeId) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), from: 0, text: input, time: now };
    const sentText = input;
    setMsgs(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setConvos(prev => prev.map(c => c.id === activeId ? { ...c, lastMsg: sentText, time: "now" } : c));
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = { id: Date.now() + 1, from: activeId, text: AUTO_RESP[Math.floor(Math.random() * AUTO_RESP.length)], time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMsgs(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), reply] }));
      setConvos(prev => prev.map(c => c.id === activeId ? { ...c, lastMsg: reply.text, time: "now" } : c));
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 56px)", maxHeight: "calc(100vh - 56px)" }}>

      {/* Sidebar — convo list */}
      <div className={`${activeId ? "hidden md:flex" : "flex"} flex-col border-r border-gray-900 w-full md:w-80 shrink-0`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-900">
          <div>
            <span className="text-white font-bold text-lg">Messages</span>
          </div>
          {/* NEW BUTTON HERE */}
          <button onClick={() => setShowUserList(true)} className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors">
             <PlusIco />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {convos.map(c => (
            <div key={c.id} onClick={() => openConvo(c.id)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-900 transition-colors ${activeId === c.id ? "bg-gray-900" : ""}`}>
              <div className="relative shrink-0" onClick={(e) => { e.stopPropagation(); onProfileClick(c.user); }}>
                <img src={c.user.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-full border-2 border-black" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${c.unread > 0 ? "font-bold text-white" : "font-medium text-gray-300"}`}>{c.user.username}</span>
                  <span className="text-xs text-gray-600">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className={`text-xs truncate ${c.unread > 0 ? "text-white" : "text-gray-500"}`}>{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-semibold">{c.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      {activeId ? (
        <div className={`flex-1 flex flex-col ${activeId ? "flex" : "hidden"} md:flex`}
          style={{ height: "100%", overflow: "hidden" }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-900 shrink-0">
            <button className="md:hidden text-white mr-1 hover:text-blue-400 transition-colors" onClick={() => setActiveId(null)}>
              <BackIco />
            </button>
            <div className="relative shrink-0 cursor-pointer" onClick={() => activeConvo && onProfileClick(activeConvo.user)}>
              <img src={activeConvo?.user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              {activeConvo?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-black" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm">{activeConvo?.user.username}</div>
              <div className={`text-xs ${activeConvo?.online ? "text-blue-400" : "text-gray-500"}`}>
                {activeConvo?.online ? "Active now" : "Offline"}
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors"><CamIco /></button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {activeMsgs.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 0 ? "justify-end" : "justify-start"} items-end gap-2`}>
                {msg.from !== 0 && (
                  <img src={activeConvo?.user.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                )}
                <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm break-words ${msg.from === 0 ? "text-white rounded-br-sm" : "bg-gray-800 text-white rounded-bl-sm"}`}
                  style={msg.from === 0 ? { background: "linear-gradient(135deg,#2563eb,#1d4ed8)" } : {}}>
                  {msg.text}
                </div>
                {msg.from === 0 && <span className="text-blue-400 shrink-0"><CheckIco /></span>}
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <img src={activeConvo?.user.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-gray-900 flex items-center gap-3 shrink-0">
            <div className="flex-1 flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2.5">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="Message…"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
              />
              <button className="text-gray-500 hover:text-white text-lg transition-colors">😊</button>
            </div>
            {input.trim() ? (
              <button onClick={sendMsg}
                className="text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
                style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
                <SendIco />
              </button>
            ) : (
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors"><CamIco /></button>
                <button className="p-2 hover:bg-gray-900 rounded-full text-blue-400 transition-colors">
                  <HeartIco f cls="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-5 text-gray-700">
          <div className="w-24 h-24 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <MsgIco f={false} />
          </div>
          <div className="text-center">
            <div className="text-white font-semibold text-xl mb-1">Your Messages</div>
            <div className="text-gray-500 text-sm">Pick a conversation or start a new one</div>
          </div>
          <button onClick={() => setShowUserList(true)} className="text-sm font-semibold text-white px-6 py-2.5 rounded-xl transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
            Send Message
          </button>
        </div>
      )}
      
      {/* MODAL FOR NEW CHAT */}
      <UserListModal 
        isOpen={showUserList} 
        onClose={() => setShowUserList(false)} 
        title="New Message" 
        users={USERS} 
        onUserClick={handleNewChat} 
      />
    </div>
  );
}

/* ── PROFILE PAGE (UPDATED) ───────────────────────────────────────────────── */
function ProfilePage({ onNav, onProfileClick }) { // Note: Added onProfileClick prop
  const [tab, setTab] = useState("posts");
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(parseInt(ME.followers));
  const savedPosts = POSTS_DATA.filter(p => p.saved);

  // NEW STATES FOR MODALS
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showStory, setShowStory] = useState(null);

  return (
    <div className="max-w-[600px] mx-auto w-full pb-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900">
        <div className="w-8"></div>
        <span className="font-bold text-white text-lg">{ME.username}</span>
        <button onClick={() => onNav("settings")} className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors">
          <MenuIco />
        </button>
      </div>

      {/* Profile header */}
      <div className="flex items-start gap-6 py-6 px-2">
        <div className="shrink-0">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full p-[3px]"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}>
            <div className="p-[2px] bg-black rounded-full w-full h-full">
              <img src={ME.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-white font-semibold text-xl">{ME.username}</span>
            {ME.verified && <VerifiedBadge />}
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            <button
              onClick={() => { setFollowing(f => !f); setFollowerCount(n => following ? n - 1 : n + 1); }}
              className={`px-5 py-1.5 rounded-xl text-sm font-semibold transition-all ${following ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700" : "text-white hover:opacity-90"}`}
              style={following ? {} : { background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
              {following ? "Following" : "Follow"}
            </button>
            <button className="px-5 py-1.5 rounded-xl text-sm font-semibold bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">
              Message
            </button>
            <button className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">
              ▾
            </button>
          </div>
          <div className="flex gap-6 mb-3">
            {/* ADDED CLICK HANDLERS HERE */}
            <button onClick={() => setShowFollowers(true)} className="cursor-pointer">
              <div className="text-white font-bold text-sm text-center">{followerCount.toLocaleString()}</div>
              <div className="text-gray-400 text-xs text-center capitalize">followers</div>
            </button>
            <button onClick={() => setShowFollowing(true)} className="cursor-pointer">
              <div className="text-white font-bold text-sm text-center">{ME.following}</div>
              <div className="text-gray-400 text-xs text-center capitalize">following</div>
            </button>
            <div>
              <div className="text-white font-bold text-sm text-center">{ME.posts}</div>
              <div className="text-gray-400 text-xs text-center capitalize">posts</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-white">{ME.name}</div>
          <div className="text-sm text-gray-400 mt-0.5 leading-relaxed">{ME.bio}</div>
        </div>
      </div>

      {/* Story highlights placeholder */}
      <div className="flex gap-4 overflow-x-auto px-2 pb-4 border-b border-gray-900"
        style={{ scrollbarWidth: "none" }}>
        {["Travel", "Dev", "Food", "Music"].map((label, i) => (
          <div key={i} onClick={() => setShowStory(`https://picsum.photos/seed/hl${i + 1}/600/900`)} className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 overflow-hidden flex items-center justify-center bg-gray-900 relative">
              <img src={`https://picsum.photos/seed/hl${i + 1}/100/100`} alt="" className="w-full h-full object-cover" />
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
        {[["posts", <GridIco />], ["saved", <SaveIco f={false} />], ["tagged", <TagIco />]].map(([t, icon]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${tab === t ? "text-blue-400 border-t-2 border-blue-400 -mt-[1px]" : "text-gray-600 hover:text-gray-400"}`}>
            <span className={tab === t ? "text-blue-400" : "text-gray-600"}>{icon}</span>
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-3 gap-[2px] mt-[2px]">
        {(tab === "saved" ? savedPosts : POSTS_DATA).map(p => (
          <div key={p.id} className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "1" }}>
            <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-bold flex items-center gap-1">
                <HeartIco f cls="w-4 h-4" />{p.likes.toLocaleString()}
              </span>
              <span className="text-white text-sm font-bold flex items-center gap-1">
                <CommentIco />{p.comments}
              </span>
            </div>
          </div>
        ))}
        {tab === "saved" && savedPosts.length === 0 && (
          <div className="col-span-3 py-16 text-center text-gray-600 text-sm">No saved posts yet</div>
        )}
        {tab === "tagged" && (
          <div className="col-span-3 py-16 text-center text-gray-600 text-sm">No tagged posts yet</div>
        )}
      </div>

      {/* MODALS ADDED AT BOTTOM */}
      <StoryViewer isOpen={!!showStory} onClose={() => setShowStory(null)} image={showStory} />
      <UserListModal isOpen={showFollowers} onClose={() => setShowFollowers(false)} title="Followers" users={USERS} onUserClick={onProfileClick} />
      <UserListModal isOpen={showFollowing} onClose={() => setShowFollowing(false)} title="Following" users={USERS} onUserClick={onProfileClick} />
    </div>
  );
}

/* ── SETTINGS PAGE (Same as before) ──────────────────────────────────────────────── */
function SettingsPage() {
  const [view, setView] = useState("menu"); 
  const [isPrivate, setIsPrivate] = useState(false);
  const [editName, setEditName] = useState(ME.name);
  const [editBio, setEditBio] = useState(ME.bio);
  const [editUser, setEditUser] = useState(ME.username);

  const handleSave = () => {
    alert("Profile Updated!");
    setView("menu");
  };

  if (view === "edit-profile") {
    return (
      <div className="max-w-[600px] mx-auto w-full pb-20 pt-4 px-4 page-enter">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView("menu")} className="text-white hover:text-blue-400 transition-colors"><BackIco /></button>
          <span className="text-white font-bold text-lg">Edit Profile</span>
        </div>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full p-[3px]" style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}>
            <div className="p-[2px] bg-black rounded-full w-full h-full"><img src={ME.avatar} alt="" className="w-full h-full rounded-full object-cover" /></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Name</label>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Name" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Username</label>
            <input value={editUser} onChange={(e) => setEditUser(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Username" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Bio</label>
            <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={4} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Tell us about yourself..." />
          </div>
          <button onClick={handleSave} className="w-full py-3 rounded-xl text-white font-bold transition-all mt-4" style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto w-full pb-20 pt-4 page-enter">
      <h1 className="text-xl font-bold text-white px-4 mb-6">Settings</h1>
      <div className="mb-2">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-4 mb-2">Account</div>
        <div className="bg-black border border-gray-900 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-900 cursor-pointer hover:bg-gray-900" onClick={() => setView("edit-profile")}>
            <div className="flex items-center gap-3"><span className="text-gray-400"><UserIco f={false} cls="w-5 h-5"/></span><span className="text-sm text-white">Edit Profile</span></div>
            <span className="text-gray-600">›</span>
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-900 hover:bg-gray-900 cursor-pointer"><div className="flex items-center gap-3"><span className="text-gray-400"><UserIco f={false} cls="w-5 h-5"/></span><span className="text-sm text-white">Personal Information</span></div><span className="text-gray-600">›</span></div>
          <div className="flex items-center justify-between p-4 hover:bg-gray-900 cursor-pointer"><div className="flex items-center gap-3"><span className="text-gray-400"><UserIco f={false} cls="w-5 h-5"/></span><span className="text-sm text-white">Change Password</span></div><span className="text-gray-600">›</span></div>
        </div>
      </div>
      <div className="px-4 mt-8"><button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-red-500 font-bold hover:bg-gray-900 transition-colors"><LogOutIco /> Log Out</button></div>
      <div className="text-center text-gray-700 text-xs mt-4">NEXUS v2.0.0</div>
    </div>
  );
}

/* ── SUGGESTED USERS ───────────────────────────── */
function SuggestedUsers({ onUserClick }) {
  const [followed, setFollowed] = useState({});
  return (
    <div className="hidden xl:block w-80 shrink-0 pl-10 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <img src={ME.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-white truncate">{ME.username}</div><div className="text-xs text-gray-500 truncate">{ME.name}</div></div>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Switch</button>
      </div>
      <div className="flex items-center justify-between mb-4"><span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Suggested</span><button className="text-xs font-semibold text-white hover:text-gray-300 transition-colors">See all</button></div>
      <div className="space-y-4">
        {USERS.slice(0, 5).map(u => (
          <div key={u.id} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full p-[2px] shrink-0 cursor-pointer" onClick={() => onUserClick(u)} style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}>
              <div className="p-[1.5px] bg-black rounded-full w-full h-full"><img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" /></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-0.5"><span className="text-xs font-semibold text-white truncate">{u.username}</span>{u.verified && <VerifiedBadge />}</div>
              <div className="text-xs text-gray-500">Suggested for you</div>
            </div>
            <button onClick={() => setFollowed(f => ({ ...f, [u.id]: !f[u.id] }))} className={`text-xs font-semibold transition-colors ${followed[u.id] ? "text-gray-500 hover:text-gray-400" : "text-blue-400 hover:text-blue-300"}`}>{followed[u.id] ? "Following" : "Follow"}</button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-gray-700 text-[11px] leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">{["About","Help","Privacy","Terms","API","Jobs","Locations"].map(t => <span key={t} className="cursor-pointer hover:text-gray-500 transition-colors">{t}</span>)}</div>
        <div className="mt-1">© 2025 NEXUS</div>
      </div>
    </div>
  );
}

/* ── LEFT SIDEBAR ─────────────────────────────────────── */
function LeftSidebar({ page, onNav }) {
  const nav = [
    { id: "home", label: "Home", icon: (a) => <HomeIco f={a} /> },
    { id: "search", label: "Search", icon: () => <SearchIco /> },
    { id: "messages", label: "Messages", icon: (a) => <MsgIco f={a} />, badge: 3 },
    { id: "profile", label: "Profile", icon: (a) => <UserIco f={a} /> },
  ];
  return (
    <aside className="hidden md:flex flex-col w-20 xl:w-64 h-screen sticky top-0 border-r border-gray-900 shrink-0">
      <div className="px-4 xl:px-6 py-6">
        <div className="flex items-center gap-3 mb-8">
          <NexusLogo />
          <span className="hidden xl:block text-2xl font-black text-white tracking-tight">NEXUS</span>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl w-full transition-all relative ${page === item.id ? "text-blue-400 font-bold" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}
              style={page === item.id ? { background: "rgba(37,99,235,0.12)" } : {}}>
              <span className="shrink-0">{item.icon(page === item.id)}</span>
              <span className="hidden xl:block text-sm">{item.label}</span>
              {item.badge && <span className="absolute xl:static top-2 right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ml-auto font-semibold">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto px-4 xl:px-6 pb-6">
        <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-900 rounded-xl cursor-pointer transition-colors">
          <img src={ME.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div className="hidden xl:block flex-1 min-w-0"><div className="text-sm font-semibold text-white truncate">{ME.username}</div><div className="text-xs text-gray-500 truncate">{ME.name}</div></div>
          <span className="hidden xl:block text-gray-600"><MoreIco /></span>
        </div>
      </div>
    </aside>
  );
}

/* ── TOP RIGHT MENU ─────────────────────────────────── */
function TopRightMenu({ onNav }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors z-20 relative"><MenuIco /></button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 top-12 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-30 page-enter">
            <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 text-white" onClick={() => { onNav("settings"); setOpen(false); }}>Settings</button>
            <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 text-white">Your Activity</button>
            <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 text-white">Saved</button>
            <div className="h-px bg-gray-800 my-1"></div>
            <button className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 text-red-500">Log out</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── BOTTOM NAV ────────────────────────────────────────── */
function BottomNav({ page, onNav }) {
  const items = [
    { id: "home", icon: (a) => <HomeIco f={a} /> },
    { id: "search", icon: () => <SearchIco /> },
    { id: "messages", icon: (a) => <MsgIco f={a} />, badge: 3 },
    { id: "profile", icon: (a) => <UserIco f={a} /> },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 z-50 flex items-center justify-around px-4 py-2 pb-4">
      {items.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} className={`relative p-3 transition-all ${page === item.id ? "text-blue-400 scale-110" : "text-gray-500 hover:text-white"}`}>
          {item.icon(page === item.id)}
          {item.badge && page !== item.id && <span className="absolute top-1.5 right-1.5 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{item.badge}</span>}
        </button>
      ))}
    </nav>
  );
}

/* ── MOBILE HEADER ──────────────────────────────────────────────── */
function MobileHeader({ page, onNav }) {
  const titles = { search: "Search", messages: "Messages", profile: "Profile", settings: "Settings" };
  return (
    <header className="md:hidden sticky top-0 z-40 bg-black border-b border-gray-900 px-4 py-3 flex items-center justify-between">
      {page === "home" ? (
        <>
          <div className="flex items-center gap-2 cursor-pointer"><NexusLogo /><span className="text-xl font-black text-white tracking-tight">NEXUS</span></div>
          <TopRightMenu onNav={onNav} />
        </>
      ) : (
        <span className="font-bold text-white text-lg">{titles[page] || page}</span>
      )}
    </header>
  );
}

/* ── APP (UPDATED) ────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  
  // New State for viewing a specific user's profile
  const [viewingUser, setViewingUser] = useState(null);

  const handleProfileClick = (user) => {
    setViewingUser(user); // Set the user we want to view
    setPage("profile");   // Switch to profile page
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-400 text-white flex">
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
        [style*="scrollbar-width"] { scrollbar-width: none; }
        @keyframes heartPop {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          40%  { transform: scale(1.3) rotate(0deg);  opacity: 1; }
          70%  { transform: scale(1.1) rotate(0deg);  opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-enter { animation: fadeIn 0.2s ease-out; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        .animate-bounce { animation: bounce 1.2s infinite; }
      `}</style>

      <LeftSidebar page={page} onNav={setPage} />

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <MobileHeader page={page} onNav={setPage} />

        <div className={`flex-1 ${page !== "messages" ? "overflow-y-auto" : "overflow-hidden"}`}>
          {page === "messages" ? (
            <div className="page-enter h-full">
              <MessagesPage onProfileClick={handleProfileClick} />
            </div>
          ) : (
            <div className="page-enter px-4 md:px-6 pb-24 md:pb-8 pt-2">
              <div className="flex gap-0">
                <div className="flex-1 min-w-0">
                  {page === "home" && <HomePage onStoryClick={alert} />}
                  {page === "search" && <SearchPage />}
                  {/* HERE: If we are viewing another user, show their profile data (Mock logic) or just alert */}
                  {/* For simplicity in this demo, we'll just load the normal ProfilePage but ideally it would accept `user` prop */}
                  {page === "profile" && <ProfilePage onNav={setPage} onProfileClick={handleProfileClick} />}
                  {page === "settings" && <SettingsPage />}
                </div>
                {page === "home" && <SuggestedUsers onUserClick={handleProfileClick} />}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav page={page} onNav={setPage} />
    </div>
  );
}