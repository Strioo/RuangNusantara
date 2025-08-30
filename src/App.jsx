import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Artikel from "./pages/Artikel";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Galery from "./pages/Galery";
import ArtikelDetailPage from "./pages/ArtikelDetailPage";

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
      </Router>
    </div>
  );
}

export default App;
