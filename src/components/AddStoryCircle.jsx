import { ME } from "../data";
import { PlusIco } from "./icons";

export default function AddStoryCircle() {
  return (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0">
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
