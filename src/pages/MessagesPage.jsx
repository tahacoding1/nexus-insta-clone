import { useState, useEffect, useRef } from "react";
import { CONVOS_INIT, MSGS_INIT, AUTO_RESP, USERS, ME } from "../data";
import { PlusIco, BackIco, CamIco, SendIco, CheckIco, HeartIco, MsgIco } from "../components/icons";
import UserListModal from "../components/UserListModal";

export default function MessagesPage({ onProfileClick }) {
  const [convos, setConvos] = useState(CONVOS_INIT);
  const [msgs, setMsgs] = useState(MSGS_INIT);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const bottomRef = useRef(null);

  const activeConvo = convos.find((c) => c.id === activeId);
  const activeMsgs = msgs[activeId] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMsgs, activeId, typing]);

  const openConvo = (id) => {
    setActiveId(id);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const handleNewChat = (user) => {
    // Check if convo exists, if not create dummy one
    let existing = convos.find((c) => c.user.id === user.id);
    if (!existing) {
      const newId = Date.now();
      const newConvo = {
        id: newId,
        user: user,
        lastMsg: "Start chatting...",
        time: "Now",
        unread: 0,
        online: true,
      };
      setConvos((prev) => [newConvo, ...prev]);
      setMsgs((prev) => ({ ...prev, [newId]: [] }));
      setActiveId(newId);
    } else {
      setActiveId(existing.id);
    }
  };

  const sendMsg = () => {
    if (!input.trim() || !activeId) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), from: 0, text: input, time: now };
    const sentText = input;

    setMsgs((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setConvos((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, lastMsg: sentText, time: "now" } : c))
    );
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = {
        id: Date.now() + 1,
        from: activeId,
        text: AUTO_RESP[Math.floor(Math.random() * AUTO_RESP.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMsgs((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), reply] }));
      setConvos((prev) =>
        prev.map((c) => (c.id === activeId ? { ...c, lastMsg: reply.text, time: "now" } : c))
      );
    }, 1200 + Math.random() * 800);
  };

  return (
    <div
      className="flex h-full"
      style={{ height: "calc(100vh - 56px)", maxHeight: "calc(100vh - 56px)" }}
    >
      {/* Conversation list sidebar */}
      <div
        className={`${
          activeId ? "hidden md:flex" : "flex"
        } flex-col border-r border-gray-900 w-full md:w-80 shrink-0`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-900">
          <span className="text-white font-bold text-lg">Messages</span>
          <button
            onClick={() => setShowNewChat(true)}
            className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors"
          >
            <PlusIco />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {convos.map((c) => (
            <div
              key={c.id}
              onClick={() => openConvo(c.id)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-900 transition-colors ${
                activeId === c.id ? "bg-gray-900" : ""
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={c.user.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProfileClick(c.user);
                  }}
                />
                {c.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-full border-2 border-black" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm cursor-pointer ${
                      c.unread > 0 ? "font-bold text-white" : "font-medium text-gray-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProfileClick(c.user);
                    }}
                  >
                    {c.user.username}
                  </span>
                  <span className="text-xs text-gray-600">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span
                    className={`text-xs truncate ${c.unread > 0 ? "text-white" : "text-gray-500"}`}
                  >
                    {c.lastMsg}
                  </span>
                  {c.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-semibold">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      {activeId ? (
        <div
          className="flex-1 flex flex-col"
          style={{ height: "100%", overflow: "hidden" }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-900 shrink-0">
            <button
              className="md:hidden text-white mr-1 hover:text-blue-400 transition-colors"
              onClick={() => setActiveId(null)}
            >
              <BackIco />
            </button>
            <div
              className="relative shrink-0 cursor-pointer"
              onClick={() => activeConvo && onProfileClick(activeConvo.user)}
            >
              <img
                src={activeConvo?.user.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              {activeConvo?.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-black" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-white text-sm cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => activeConvo && onProfileClick(activeConvo.user)}
              >
                {activeConvo?.user.username}
              </div>
              <div
                className={`text-xs ${
                  activeConvo?.online ? "text-blue-400" : "text-gray-500"
                }`}
              >
                {activeConvo?.online ? "Active now" : "Offline"}
              </div>
            </div>
            <button className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors">
              <CamIco />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ minHeight: 0 }}
          >
            {activeMsgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.from === 0 ? "justify-end" : "justify-start"
                } items-end gap-2`}
              >
                {msg.from !== 0 && (
                  <img
                    src={activeConvo?.user.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                )}
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm break-words ${
                    msg.from === 0
                      ? "text-white rounded-br-sm"
                      : "bg-gray-800 text-white rounded-bl-sm"
                  }`}
                  style={
                    msg.from === 0
                      ? { background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }
                      : {}
                  }
                >
                  {msg.text}
                </div>
                {msg.from === 0 && (
                  <span className="text-blue-400 shrink-0">
                    <CheckIco />
                  </span>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2">
                <img
                  src={activeConvo?.user.avatar}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full typing-dot"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Message…"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
              />
              <button className="text-gray-500 hover:text-white text-lg transition-colors">
                😊
              </button>
            </div>
            {input.trim() ? (
              <button
                onClick={sendMsg}
                className="text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
              >
                <SendIco />
              </button>
            ) : (
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-900 rounded-full text-white transition-colors">
                  <CamIco />
                </button>
                <button className="p-2 hover:bg-gray-900 rounded-full text-blue-400 transition-colors">
                  <HeartIco f cls="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-5 text-gray-700">
          <div className="w-24 h-24 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <MsgIco f={false} />
          </div>
          <div className="text-center">
            <div className="text-white font-semibold text-xl mb-1">Your Messages</div>
            <div className="text-gray-500 text-sm">
              Pick a conversation or start a new one
            </div>
          </div>
          <button
            className="text-sm font-semibold text-white px-6 py-2.5 rounded-xl transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
          >
            Send Message
          </button>
        </div>
      )}

      {/* New Chat Modal */}
      <UserListModal
        isOpen={showNewChat}
        onClose={() => setShowNewChat(false)}
        title="New Message"
        onUserClick={handleNewChat}
        isFollowed={(user) => ME.followingList.includes(user.id)}
      />
    </div>
  );
}
