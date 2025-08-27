import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/about" component={AboutPage}/>
        
      </Router>
    </div>
  );
}

export default App;
