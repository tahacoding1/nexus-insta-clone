import { useState } from "react";

export default function StoryCircle({ story, seen: initialSeen, onClick }) {
  const [seen, setSeen] = useState(initialSeen);

  return (
    <button
      className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
      onClick={() => {
        setSeen(true);
        onClick?.(story);
      }}
    >
      <div
        className={`p-[2px] rounded-full transition-all duration-300 ${seen ? "bg-gray-700" : ""}`}
        style={
          seen
            ? {}
            : { background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #06b6d4)" }
        }
      >
        <div className="p-[2px] bg-black rounded-full">
          <img
            src={story.user.avatar}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-400 truncate w-16 text-center">
        {story.user.username}
      </span>
    </button>
  );
}
