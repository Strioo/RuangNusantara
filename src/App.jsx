import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Artikel from "./pages/Artikel";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/signup" component={SignUpPage}/>
        <Route path="/signin" component={SignInPage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/artikel" component={Artikel}/>
      </Router>
    </div>
  );
}

export default App;
