// ── CURRENT USER ────────────────────────────────────────────────────
export const ME = {
  id: 0,
  username: "yourname",
  name: "Your Name",
  avatar: "https://i.pravatar.cc/150?img=10",
  followers: "2.1K",
  following: 418,
  posts: 12,
  bio: "🌊 Just vibing | 📍 Earth | 💙 Blue everything",
  verified: false,
  followingList: [1, 2, 3], // IDs of followed users
};

// ── OTHER USERS ──────────────────────────────────────────────────────
export const USERS = [
  {
    id: 1,
    username: "alex_rivera",
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?img=1",
    followers: "12.4K",
    following: 892,
    posts: 47,
    bio: "✨ Digital Artist | 📍 NYC | Creating worlds pixel by pixel",
    verified: true,
  },
  {
    id: 2,
    username: "sara_moon",
    name: "Sara Moon",
    avatar: "https://i.pravatar.cc/150?img=5",
    followers: "8.2K",
    following: 341,
    posts: 23,
    bio: "🌙 Night owl | 📸 Photography | Catching golden hours",
    verified: false,
  },
  {
    id: 3,
    username: "james_k",
    name: "James K.",
    avatar: "https://i.pravatar.cc/150?img=3",
    followers: "45.1K",
    following: 212,
    posts: 156,
    bio: "🚀 Entrepreneur | 💡 Building the future | Speaker",
    verified: true,
  },
  {
    id: 4,
    username: "mia_chen",
    name: "Mia Chen",
    avatar: "https://i.pravatar.cc/150?img=9",
    followers: "6.7K",
    following: 503,
    posts: 34,
    bio: "🎨 Art director | 🌸 Seoul → LA | Visual storyteller",
    verified: false,
  },
  {
    id: 5,
    username: "dev_noor",
    name: "Noor Dev",
    avatar: "https://i.pravatar.cc/150?img=7",
    followers: "3.2K",
    following: 189,
    posts: 19,
    bio: "💻 Full-stack dev | ⚡ Open source | Coffee = code",
    verified: false,
  },
  {
    id: 6,
    username: "lena_w",
    name: "Lena W.",
    avatar: "https://i.pravatar.cc/150?img=11",
    followers: "19.8K",
    following: 670,
    posts: 89,
    bio: "🎵 Music producer | 🎧 Beats and vibes | LA",
    verified: true,
  },
];

// ── STORIES ──────────────────────────────────────────────────────────
export const STORIES_DATA = [
  {
    id: 1,
    user: USERS[0],
    seen: false,
    image: "https://picsum.photos/seed/story1/800/1200",
  },
  {
    id: 2,
    user: USERS[1],
    seen: false,
    image: "https://picsum.photos/seed/story2/800/1200",
  },
  {
    id: 3,
    user: USERS[2],
    seen: true,
    image: "https://picsum.photos/seed/story3/800/1200",
  },
  {
    id: 4,
    user: USERS[3],
    seen: false,
    image: "https://picsum.photos/seed/story4/800/1200",
  },
  {
    id: 5,
    user: USERS[4],
    seen: true,
    image: "https://picsum.photos/seed/story5/800/1200",
  },
  {
    id: 6,
    user: USERS[5],
    seen: false,
    image: "https://picsum.photos/seed/story6/800/1200",
  },
];

// ── POSTS ─────────────────────────────────────────────────────────────
export const POSTS_DATA = [
  {
    id: 1,
    user: USERS[0],
    image: "https://picsum.photos/seed/p101/600/600",
    caption:
      "Lost in the city lights ✨ Every corner tells a story. This place never sleeps and honestly neither do I anymore 🌆",
    likes: 1423,
    comments: 87,
    saved: false,
    liked: false,
    time: "2h",
    commentsList: [
      { user: USERS[1], text: "Absolutely stunning! 😍" },
      { user: USERS[2], text: "The lighting here is perfect" },
    ],
  },
  {
    id: 2,
    user: USERS[1],
    image: "https://picsum.photos/seed/p202/600/600",
    caption:
      "Golden hour never misses 🌅 Caught this on my morning run. Sometimes waking up early is totally worth it.",
    likes: 892,
    comments: 43,
    saved: true,
    liked: true,
    time: "4h",
    commentsList: [{ user: USERS[3], text: "Goals! 🔥" }],
  },
  {
    id: 3,
    user: USERS[2],
    image: "https://picsum.photos/seed/p303/600/600",
    caption:
      "New chapter begins today 🚀 Excited to share what we've been building. Stay tuned for the big announcement!",
    likes: 3201,
    comments: 156,
    saved: false,
    liked: false,
    time: "6h",
    commentsList: [
      { user: USERS[0], text: "Can't wait! 🙌" },
      { user: USERS[4], text: "We're ready for it!" },
    ],
  },
  {
    id: 4,
    user: USERS[3],
    image: "https://picsum.photos/seed/p404/600/600",
    caption:
      "Art is not what you see, but what you make others see 🎨 New series dropping this week.",
    likes: 567,
    comments: 31,
    saved: false,
    liked: false,
    time: "8h",
    commentsList: [],
  },
  {
    id: 5,
    user: USERS[4],
    image: "https://picsum.photos/seed/p505/600/600",
    caption:
      "shipped it at 3am like a true dev 💻⚡ The bug took 6 hours. The fix was one line. Classic.",
    likes: 2104,
    comments: 98,
    saved: false,
    liked: false,
    time: "12h",
    commentsList: [
      { user: USERS[1], text: "This hits too close to home 😭" },
    ],
  },
  {
    id: 6,
    user: USERS[5],
    image: "https://picsum.photos/seed/p606/600/600",
    caption:
      "Studio session went til sunrise 🎵 New track coming soon. This one's different.",
    likes: 4890,
    comments: 234,
    saved: true,
    liked: true,
    time: "1d",
    commentsList: [],
  },
];

// ── EXPLORE IMAGES ────────────────────────────────────────────────────
export const EXPLORE_IMGS = [
  { id: 1, src: "https://picsum.photos/seed/ex11/400/400", likes: 875 },
  { id: 2, src: "https://picsum.photos/seed/ex22/400/400", likes: 642 },
  { id: 3, src: "https://picsum.photos/seed/ex33/400/400", likes: 931 },
  { id: 4, src: "https://picsum.photos/seed/ex44/400/400", likes: 510 },
  { id: 5, src: "https://picsum.photos/seed/ex55/400/400", likes: 784 },
  { id: 6, src: "https://picsum.photos/seed/ex66/400/400", likes: 429 },
  { id: 7, src: "https://picsum.photos/seed/ex77/400/400", likes: 698 },
  { id: 8, src: "https://picsum.photos/seed/ex88/400/400", likes: 312 },
  { id: 9, src: "https://picsum.photos/seed/ex99/400/400", likes: 557 },
];

// ── CONVERSATIONS ─────────────────────────────────────────────────────
export const CONVOS_INIT = [
  { id: 1, user: USERS[0], lastMsg: "That photo was amazing! 🔥", time: "2m", unread: 2, online: true },
  { id: 2, user: USERS[1], lastMsg: "Sure, let's meet tomorrow",   time: "15m", unread: 0, online: true },
  { id: 3, user: USERS[2], lastMsg: "Check out this link!",        time: "1h",  unread: 1, online: false },
  { id: 4, user: USERS[3], lastMsg: "Loved your latest post ❤️",  time: "3h",  unread: 0, online: false },
  { id: 5, user: USERS[4], lastMsg: "haha same 😂",               time: "1d",  unread: 0, online: true },
];

// ── INITIAL MESSAGES ──────────────────────────────────────────────────
export const MSGS_INIT = {
  1: [
    { id: 1, from: 1, text: "Hey! Just saw your story 👋",      time: "10:30 AM" },
    { id: 2, from: 0, text: "Haha yeah, it was a great day!",   time: "10:31 AM" },
    { id: 3, from: 1, text: "That photo was amazing! 🔥",       time: "10:32 AM" },
  ],
  2: [
    { id: 1, from: 2, text: "Are you free this weekend?",       time: "Yesterday" },
    { id: 2, from: 0, text: "Yeah I think so, why?",            time: "Yesterday" },
    { id: 3, from: 2, text: "Sure, let's meet tomorrow",        time: "Yesterday" },
  ],
  3: [{ id: 1, from: 3, text: "Check out this link!",           time: "2:00 PM"  }],
  4: [{ id: 1, from: 4, text: "Loved your latest post ❤️",     time: "Morning"  }],
  5: [
    { id: 1, from: 0, text: "I know right?",                    time: "Yesterday" },
    { id: 2, from: 5, text: "haha same 😂",                     time: "Yesterday" },
  ],
};

// ── AUTO REPLIES ──────────────────────────────────────────────────────
export const AUTO_RESP = [
  "That's so cool 😄",
  "Haha yeah totally!",
  "No way!! 😱",
  "Love that 💙",
  "Let's catch up soon!",
  "Okay tell me more",
  "Yesss!! 🙌",
  "Wait really??",
  "That's amazing honestly",
  "💙💙💙",
];
