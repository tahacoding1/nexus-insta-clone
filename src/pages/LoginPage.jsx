import { useState } from "react";
import { NexusLogo } from "../components/icons";

export default function LoginPage({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, username: email.split("@")[0] });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 auth-container">
      <div className="w-full max-w-sm">
        <div className="glass-panel rounded-[2rem] border border-white/10 px-8 py-10 mb-3 auth-card">
          {/* Logo */}
          <div className="flex justify-center mb-8 auth-logo">
            <div className="flex items-center gap-3">
              <NexusLogo />
              <span className="text-3xl font-black text-white tracking-tight">NEXUS</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 auth-form">
            <input
              type="email"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="form-field btn-primary w-full bg-blue-500 text-white font-bold py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!email || !password}
            >
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Social login (demo) */}
          <button className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-sm py-2 rounded-3xl hover:opacity-95 transition-colors">
            Log in with Facebook
          </button>

          {/* Forgot password */}
          <div className="text-center mt-6">
            <a href="#" className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Signup link */}
        <div className="glass-panel rounded-[1.5rem] border border-white/10 py-4 px-8 text-center auth-card">
          <span className="text-slate-400 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => onSwitch("signup")}
              className="auth-link text-indigo-300 font-semibold hover:text-indigo-200 transition-colors"
            >
              Sign up
            </button>
          </span>
        </div>

        {/* Demo info */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Demo: Use any email/password to login
          </p>
        </div>
      </div>
    </div>
  );
}
