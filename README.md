# NEXUS — Social Media App

A sleek, Instagram-inspired social media app built with **React + Vite + Tailwind CSS**.

## Features

- 🏠 **Home Feed** — Stories strip, posts with like/comment/save
- 🔍 **Search/Explore** — Search users, explore image grid
- 💬 **Messages** — Real-time-like DM interface with auto-replies
- 👤 **Profile** — Grid view, saved posts, highlights, follow/unfollow
- 📱 **Fully Responsive** — Mobile bottom nav + desktop sidebar layout
- ⚡ **Neon Black & Blue Theme** — Black with neon blue gradient for modern edge
- ✨ **Smooth Animations** — Friendly and polished UI/UX everywhere

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)

## Project Structure

```
nexus/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx            # App entry point
│   ├── App.jsx             # Root layout + page routing
│   ├── index.css           # Global styles + custom animations
│   ├── data/
│   │   └── index.js        # Mock users, posts, messages data
│   ├── components/
│   │   ├── icons/
│   │   │   └── index.jsx   # All SVG icon components
│   │   ├── AddStoryCircle.jsx
│   │   ├── BottomNav.jsx
│   │   ├── LeftSidebar.jsx
│   │   ├── MobileHeader.jsx
│   │   ├── PostCard.jsx
│   │   ├── StoryCircle.jsx
│   │   └── SuggestedUsers.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── MessagesPage.jsx
│       ├── ProfilePage.jsx
│       └── SearchPage.jsx
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```
