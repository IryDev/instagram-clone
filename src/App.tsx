import { Routes, Route } from "react-router-dom";
import SigninForm from "./components/auth/form/SigninForm";
import SignupForm from "./components/auth/form/SignupForm";
import AuthLayout from "./components/auth/AuthLayout";
import RootLayout from "./components/root/RootLayout";
import Home from "./components/root/pages/Home";
import Explore from "./components/root/pages/Explore";
import Profile from "./components/root/pages/Profile";
import Create from "./components/root/pages/Create";
import ForgotPasswordForm from "./components/auth/form/ForgotPasswordForm";
import ResetPasswordForm from "./components/auth/form/ResetPasswordForm";
import NotFoundAuth from "./components/auth/NotFound";
import NotFound from "./components/root/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route path="/accounts" element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />} />
          <Route path="sign-up" element={<SignupForm />} />
          <Route path="forgot-password" element={<ForgotPasswordForm />} />
          <Route path="reset-password" element={<ResetPasswordForm />} />

          {/* Route 404 pour /accounts */}
          <Route path="*" element={<NotFoundAuth />} />
        </Route>

        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile/:userId" element={<Profile />} />

          {/* Route 404 pour la racine */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
