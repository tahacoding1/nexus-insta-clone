import { useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import BottomNav from "./components/BottomNav";
import MobileHeader from "./components/MobileHeader";
import SuggestedUsers from "./components/SuggestedUsers";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoryViewer from "./components/StoryViewer";

export default function App() {
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [page, setPage] = useState("home");

  // New state for viewing other users' profiles and story viewer
  const [viewingUser, setViewingUser] = useState(null);
  const [viewingStory, setViewingStory] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setAuthPage("login");
  };

  const handleStoryClick = (story) => {
    setViewingStory(story);
  };

  const handleProfileClick = (user) => {
    setViewingUser(user);
    setPage("profile");
  };

  const handleNav = (newPage) => {
    if (newPage === "profile") {
      setViewingUser(null);
    }
    setPage(newPage);
  };

  // Show login/signup if not authenticated
  if (!user) {
    return (
      <>
        {authPage === "login" ? (
          <LoginPage onSwitch={setAuthPage} onLogin={handleLogin} />
        ) : (
          <SignupPage onSwitch={setAuthPage} onSignup={handleSignup} />
        )}
      </>
    );
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.4),_transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.24),_transparent_70%)] blur-3xl" />
      </div>
      {/* Desktop left sidebar */}
      <LeftSidebar page={page} onNav={handleNav} user={user} onLogout={handleLogout} />

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile-only header */}
        <MobileHeader page={page} onNav={setPage} />

        <div className={`flex-1 ${page !== "messages" ? "overflow-y-auto" : "overflow-hidden"}`}>
          {page === "messages" ? (
            <div className="page-enter h-full">
              <MessagesPage onProfileClick={handleProfileClick} />
            </div>
          ) : (
            <div className="page-enter px-4 md:px-6 pb-24 md:pb-8 pt-2">
              <div className="flex gap-0">
                <div className="flex-1 min-w-0">
                  {page === "home"    && <HomePage onStoryClick={handleStoryClick} />}
                  {page === "search"  && <SearchPage />}
                  {page === "messages" && <MessagesPage onProfileClick={handleProfileClick} />}
                  {page === "profile" && <ProfilePage onNav={setPage} viewingUser={viewingUser} />}
                  {page === "settings" && <SettingsPage onBack={() => setPage("profile")} />}
                </div>
                {/* Desktop right sidebar - only on home */}
                {page === "home" && <SuggestedUsers />}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <BottomNav page={page} onNav={handleNav} />

      {/* Story Viewer Modal */}
      {viewingStory && (
        <StoryViewer
          image={viewingStory.image || viewingStory.user.avatar}
          onClose={() => setViewingStory(null)}
        />
      )}
    </div>
  );
}
