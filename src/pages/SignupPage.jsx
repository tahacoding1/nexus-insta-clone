import { useState } from "react";
import { NexusLogo } from "../components/icons";

export default function SignupPage({ onSwitch, onSignup }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    onSignup({
      email: formData.email,
      username: formData.username,
    });
    setFormData({ email: "", username: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 auth-container">
      <div className="w-full max-w-sm">
        <div className="glass-panel rounded-[2rem] border border-white/10 px-8 py-8 mb-3 auth-card">
          {/* Logo */}
          <div className="flex justify-center mb-6 auth-logo">
            <div className="flex items-center gap-3">
              <NexusLogo />
              <span className="text-3xl font-black text-white tracking-tight">NEXUS</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm text-center mb-6 font-semibold">
            Sign up to see photos and videos from your friends.
          </p>

          {/* Facebook signup button (demo) */}
          <button className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold py-2 rounded-3xl text-sm hover:opacity-95 transition-colors mb-4">
            Continue with Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-3 auth-form">
            {error && (
              <div className="form-field bg-red-900 border border-red-700 rounded px-3 py-2 text-red-200 text-sm">
                {error}
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-field form-input w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="form-field btn-primary w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold py-2 rounded-3xl text-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.email || !formData.username || !formData.password || !formData.confirmPassword}
            >
              Sign up
            </button>
          </form>

          {/* Terms */}
          <p className="text-gray-500 text-xs text-center mt-4 leading-relaxed">
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </p>
        </div>

        {/* Login link */}
        <div className="glass-panel rounded-[1.5rem] border border-white/10 py-4 px-8 text-center auth-card">
          <span className="text-slate-400 text-sm">
            Have an account?{" "}
            <button
              onClick={() => onSwitch("login")}
              className="auth-link text-indigo-300 font-semibold hover:text-indigo-200 transition-colors"
            >
              Log in
            </button>
          </span>
        </div>

        {/* Demo info */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Demo: Complete the form to create an account
          </p>
        </div>
      </div>
    </div>
  );
}
