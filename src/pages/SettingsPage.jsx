import { useState } from "react";
import { BackIco, UserIco } from "../components/icons";

export default function SettingsPage({ onBack }) {
  const [view, setView] = useState("menu");
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("Your Name");
  const [username, setUsername] = useState("yourname");
  const [bio, setBio] = useState("Just connecting with friends.");

  const handleSave = () => {
    setView("menu");
    alert("Settings updated! (Demo mode)");
  };

  if (view === "edit-profile") {
    return (
      <div className="max-w-[600px] mx-auto w-full pb-20 pt-4 px-4 page-enter">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView("menu")} className="text-white hover:text-blue-400 transition-colors">
            <BackIco />
          </button>
          <span className="text-white font-bold text-lg">Edit Profile</span>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl text-white font-bold transition-all"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto w-full pb-20 pt-4 px-4 page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your account and privacy settings.</p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Back
          </button>
        )}
      </div>

      <div className="space-y-4">
        <Section title="Account">
          <SettingButton label="Edit Profile" icon={<UserIco f={false} cls="w-5 h-5" />} onClick={() => setView("edit-profile")} />
          <SettingButton label="Change Password" icon={<UserIco f={false} cls="w-5 h-5" />} />
        </Section>

        <Section title="Privacy & Security">
          <SettingToggle label="Private Account" value={isPrivate} onToggle={() => setIsPrivate((v) => !v)} />
          <SettingButton label="Two-Factor Authentication" icon={<UserIco f={false} cls="w-5 h-5" />} />
        </Section>

        <Section title="Support">
          <SettingButton label="Help Center" icon={<UserIco f={false} cls="w-5 h-5" />} />
          <SettingButton label="Log out" icon={<UserIco f={false} cls="w-5 h-5" />} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-black border border-gray-900 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-900 text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
        {title}
      </div>
      <div className="space-y-1 p-2">{children}</div>
    </div>
  );
}

function SettingButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-white hover:bg-gray-900 transition-colors"
    >
      <div className="w-9 h-9 rounded-2xl bg-gray-900 flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function SettingToggle({ label, value, onToggle }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-950 text-white">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-gray-400">{value ? "On" : "Off"}</div>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors ${value ? "bg-blue-500" : "bg-gray-700"}`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white transform transition-transform ${value ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
