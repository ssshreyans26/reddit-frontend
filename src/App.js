import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>

      <Route exact path="/" component={Dashboard}/>
      <Route path="/createpost" component={CreatePost}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
