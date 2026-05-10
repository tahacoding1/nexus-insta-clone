import { CloseIco } from "./icons";

export default function StoryViewer({ isOpen, onClose, image }) {
  if (!isOpen && !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="text-white p-2 bg-black/50 rounded-full hover:bg-black/80"
        >
          <CloseIco />
        </button>
      </div>
      <img src={image} alt="Story" className="max-w-full max-h-full object-contain" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/60"></div>
    </div>
  );
}