import { Router, Route } from "@solidjs/router";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Artikel from "./pages/Artikel";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Galery from "./pages/Galery";
import ArtikelDetailPage from "./pages/ArtikelDetailPage";
// import SlideLangkahPermainan from "./pages/SlideLangkahPermainan";
import DashboardAdmin from "./pages/admin/DashboardPage";
import UsersData from "./pages/admin/UsersData";
import AddUsers from "./pages/admin/AddUsers";
import EditUsers from "./pages/admin/EditUsers";
import ArticlePage from "./pages/admin/ArticlePage";
import AddArticle from "./pages/admin/AddArticles";
import EditArticle from "./pages/admin/EditArticle";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/artikel" component={Artikel} />
        <Route path="/artikel/:id" component={ArtikelDetailPage} />
        <Route path="/galery" component={Galery} />
        <Route path="/dashboard" component={DashboardAdmin} />
        {/* <Route path="/permainan/:id" component={SlideLangkahPermainan} /> */}
        <Route path="/dashboard" component={DashboardAdmin} />
        <Route path="/usersmanagement" component={UsersData} />
        <Route path="/addusers" component={AddUsers} />
        <Route path="/editusers/:email" component={EditUsers} />
        <Route path="/articlemanagement" component={ArticlePage} />
        <Route path="/addarticles" component={AddArticle} />
        <Route path="/editarticle/:id" component={EditArticle} />
      </Router>
    </div>
  );
}

export default App;
