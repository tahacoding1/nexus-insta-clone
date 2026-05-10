import { useState } from "react";
import { ME } from "../data";
import { HeartIco, CommentIco, ShareIco, SaveIco, MoreIco } from "./icons";
import { VerifiedBadge } from "./icons";

const CAP_LEN = 100;

export default function PostCard({ postInit }) {
  const [post, setPost] = useState(postInit);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [heartAnim, setHeartAnim] = useState(false);
  const [dblHeartVis, setDblHeartVis] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 350);
    setPost((p) => ({
      ...p,
      liked: !p.liked,
      likes: p.liked ? p.likes - 1 : p.likes + 1,
    }));
  };

  const dblClickLike = () => {
    if (!post.liked) setPost((p) => ({ ...p, liked: true, likes: p.likes + 1 }));
    setDblHeartVis(true);
    setTimeout(() => setDblHeartVis(false), 900);
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    setPost((p) => ({
      ...p,
      commentsList: [...p.commentsList, { user: ME, text: commentText }],
      comments: p.comments + 1,
    }));
    setCommentText("");
  };

  const longCap = post.caption.length > CAP_LEN;

  return (
    <article className="glass-panel rounded-[2rem] border border-white/10 mb-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full p-[2px] shrink-0 cursor-pointer"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6,#06b6d4)" }}
          >
            <div className="p-[1.5px] bg-black rounded-full w-full h-full">
              <img
                src={post.user.avatar}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors leading-none">
                {post.user.username}
              </span>
              {post.user.verified && <VerifiedBadge />}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{post.time} ago</div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white p-1 transition-colors">
          <MoreIco />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative cursor-pointer select-none overflow-hidden rounded-[1.75rem] mx-4"
        onDoubleClick={dblClickLike}
      >
        <img
          src={post.image}
          alt=""
          className="w-full object-cover"
          style={{ maxHeight: 500 }}
          loading="lazy"
        />
        {dblHeartVis && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-blue-400 heart-pop">
              <HeartIco f cls="w-24 h-24 drop-shadow-xl" />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className={`transition-transform duration-200 ${heartAnim ? "scale-125" : "scale-100"}`}
          >
            <span
              className={`block transition-colors ${post.liked ? "text-blue-400" : "text-white"}`}
            >
              <HeartIco f={post.liked} />
            </span>
          </button>
          <button
            onClick={() => setShowComments((s) => !s)}
            className="text-white hover:text-blue-400 transition-colors"
          >
            <CommentIco />
          </button>
          <button className="text-white hover:text-blue-400 transition-colors">
            <ShareIco />
          </button>
        </div>
        <button
          onClick={() => setPost((p) => ({ ...p, saved: !p.saved }))}
          className={`transition-colors ${post.saved ? "text-blue-400" : "text-white hover:text-blue-400"}`}
        >
          <SaveIco f={post.saved} />
        </button>
      </div>

      {/* Likes count */}
      <div className="text-sm font-semibold text-white px-4">{post.likes.toLocaleString()} likes</div>

      {/* Caption */}
      <div className="text-sm text-slate-200 mt-1 leading-relaxed px-4">
        <span className="font-semibold text-white mr-1">{post.user.username}</span>
        {longCap && !expanded ? (
          <>
            {post.caption.slice(0, CAP_LEN)}…{" "}
            <button
              className="text-gray-500 hover:text-gray-300 text-xs"
              onClick={() => setExpanded(true)}
            >
              more
            </button>
          </>
        ) : (
          post.caption
        )}
      </div>

      {/* Toggle comments */}
      {post.comments > 0 && (
        <button
          className="text-sm text-slate-400 hover:text-slate-200 mt-1 transition-colors px-4"
          onClick={() => setShowComments((s) => !s)}
        >
          {showComments ? "Hide" : `View all ${post.comments} comments`}
        </button>
      )}

      {/* Comments list */}
      {showComments && (
        <div className="mt-2 space-y-1.5">
          {post.commentsList.map((c, i) => (
            <div key={i} className="text-sm text-gray-200">
              <span className="font-semibold text-white mr-1">{c.user.username}</span>
              {c.text}
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="flex items-center gap-2 mt-3 border-t border-white/10 pt-3 px-4 pb-4">
        <img
          src={ME.avatar}
          alt=""
          className="w-7 h-7 rounded-full object-cover shrink-0"
        />
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          placeholder="Add a comment…"
          className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-700 outline-none"
        />
        {commentText && (
          <button
            onClick={addComment}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            Post
          </button>
        )}
      </div>
    </article>
  );
}
