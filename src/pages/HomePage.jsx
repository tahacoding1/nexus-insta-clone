import { STORIES_DATA, POSTS_DATA, ME } from "../data";
import StoryCircle from "../components/StoryCircle";
import AddStoryCircle from "../components/AddStoryCircle";
import PostCard from "../components/PostCard";

export default function HomePage({ onStoryClick }) {
  // Filter stories to only show followed users
  const followedStories = STORIES_DATA.filter((story) => ME.followingList.includes(story.user.id));

  return (
    <div className="max-w-[520px] mx-auto w-full space-y-5">
      <div className="glass-panel rounded-[2rem] p-5 border border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
              Nexus Pulse
            </div>
            <div className="text-2xl font-bold text-white leading-tight">
              Discover new stories and moments.
            </div>
          </div>
          <div className="text-sm text-slate-400">Curated for you</div>
        </div>
      </div>

      {/* Stories strip */}
      <div
        className="glass-panel rounded-[2rem] flex gap-4 overflow-x-auto py-4 px-3 border border-white/10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AddStoryCircle />
        {followedStories.map((s) => (
          <StoryCircle key={s.id} story={s} seen={s.seen} onClick={onStoryClick} />
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-5">
        {POSTS_DATA.map((p) => (
          <PostCard key={p.id} postInit={p} />
        ))}
      </div>
    </div>
  );
}
