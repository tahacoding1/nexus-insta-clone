import { useState } from "react";
import { HeartIco, CommentIco, ShareIco, SaveIco, CloseIco } from "./icons";

export default function PostDetailModal({ isOpen, onClose, post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-white p-2 bg-black/50 rounded-full hover:bg-gray-800"
        >
          <CloseIco />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-[#121212] flex items-center justify-center p-2">
          <img src={post.src} alt="Post" className="max-h-[50vh] md:max-h-full object-contain" />
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/2 flex flex-col bg-black">
          <div className="p-4 border-b border-gray-900 flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=10" alt="" className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-sm">yourname</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-sm">yourname</span>
              <span className="text-sm text-gray-300">Loving this vibe! ✨</span>
            </div>
          </div>
          <div className="p-4 border-t border-gray-900">
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500" : "text-white"}
              >
                <HeartIco f={liked} />
              </button>
              <button className="text-white">
                <CommentIco />
              </button>
              <button className="text-white">
                <ShareIco />
              </button>
              <div className="flex-1"></div>
              <button
                onClick={() => setSaved(!saved)}
                className={saved ? "text-blue-400" : "text-white"}
              >
                <SaveIco f={saved} />
              </button>
            </div>
            <div className="font-bold text-sm mb-1">{post.likes} likes</div>
            <div className="text-xs text-gray-500 uppercase font-bold">2 HOURS AGO</div>
          </div>
        </div>
      </div>
    </div>
  );
}