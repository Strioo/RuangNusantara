// src/App.jsx
import { Router, Route, Navigate } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Artikel from "./pages/Artikel";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Galery from "./pages/Galery";
import ArtikelDetailPage from "./pages/ArtikelDetailPage";
import UsersData from "./pages/admin/UsersData";
import AddUsers from "./pages/admin/AddUsers";
import EditUsers from "./pages/admin/EditUsers";
import ArticlePage from "./pages/admin/ArticlePage";
import AddArticle from "./pages/admin/AddArticles";
import EditArticle from "./pages/admin/EditArticle";
import SlideLangkahPermainan from "./pages/SlideLangkahPermainan";
import VerifikasiOTP from "./pages/VerifikasiOTP";
import ForgotPassword from "./pages/ForgotPassword";

/* ===================== Helpers ===================== */
const fetchMe = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const res = await fetch("http://127.0.0.1:8080/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const me = await res.json(); // { id, username, email, role }
    // sinkronkan ke localStorage (optional, biar Navbar/NavAdmin bisa baca role)
    const curr = localStorage.getItem("currentUser");
    if (curr) {
      const obj = { ...JSON.parse(curr), role: me.role };
      localStorage.setItem("currentUser", JSON.stringify(obj));
    }
    return me;
  } catch {
    return null;
  }
};

/** Route guard khusus admin */
function AdminRoute(props) {
  const [me] = createResource(fetchMe);

  return (
    <Show
      when={me.state === "ready"}
      fallback={
        <div class="min-h-screen grid place-items-center">
          <div class="loading loading-spinner loading-lg text-[#264653]" />
        </div>
      }
    >
      <Show
        when={me() && me().role && me().role.toLowerCase() === "admin"}
        fallback={<Navigate href="/" />}
      >
        {props.children}
      </Show>
    </Show>
  );
}

/* ===================== App ===================== */
function App() {
  return (
    <div>
      <Router>
        {/* Public routes */}
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/verifikasi" component={VerifikasiOTP} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/about" component={AboutPage} />
        <Route path="/artikel" component={Artikel} />
        <Route path="/artikel/:id" component={ArtikelDetailPage} />
        <Route path="/galery" component={Galery} />
        <Route path="/permainan/:id" component={SlideLangkahPermainan} />

        {/* Admin-only routes */}
        <Route
          path="/usersmanagement"
          component={() => (
            <AdminRoute>
              <UsersData />
            </AdminRoute>
          )}
        />
        <Route
          path="/addusers"
          component={() => (
            <AdminRoute>
              <AddUsers />
            </AdminRoute>
          )}
        />
        <Route
          path="/editusers/:id"
          component={() => (
            <AdminRoute>
              <EditUsers />
            </AdminRoute>
          )}
        />
        <Route
          path="/articlemanagement"
          component={() => (
            <AdminRoute>
              <ArticlePage />
            </AdminRoute>
          )}
        />
        <Route
          path="/addarticles"
          component={() => (
            <AdminRoute>
              <AddArticle />
            </AdminRoute>
          )}
        />
        <Route
          path="/editarticle/:id"
          component={() => (
            <AdminRoute>
              <EditArticle />
            </AdminRoute>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
