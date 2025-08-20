import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import PostBlogPage from "./pages/PostBlogPage.tsx";
import SettingPage from "./pages/SettingPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AppearancePage from "./pages/AppearancePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import SavedPage from "./pages/SavedPage.tsx";
import LikedPage from "./pages/LikedPage.tsx";
import SingleBlogPage from "./pages/SingleBlogPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import { useContext } from "react";
import { DataContext } from "./context/DataContext.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import LandingPage from "./pages/LandingPage.tsx";

function App() {
  const { isAuth }: any = useContext(DataContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* UnAuthenticated Pages */}
            <Route path="/" element={isAuth ? <Navigate to={"/dashboard"} /> : <LandingPage />} />
            <Route
              path="/login"
              element={isAuth ? <Navigate to={"/dashboard"} /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={isAuth ? <Navigate to={"/dashboard"} /> : <SignupPage />}
            />
            <Route
              path="/forgot"
              element={isAuth ? <Navigate to={"/dashboard"} /> : <ForgotPassword />}
            />

          {/* Authenticated Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <PostBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appearance"
            element={
              <ProtectedRoute>
                <AppearancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <SingleBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saves"
            element={
              <ProtectedRoute>
                <SavedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/likes"
            element={
              <ProtectedRoute>
                <LikedPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
