import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Artikel from "./pages/Artikel";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/artikel" component={Artikel}/>
      </Router>
    </div>
  );
}

export default App;
