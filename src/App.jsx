import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
