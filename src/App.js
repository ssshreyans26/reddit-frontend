import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import GoogleLogin from "./components/GoogleLogin"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/googlelogin">Google Login</Link>

      <Route exact path="/googlelogin" component={GoogleLogin}/>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/createpost" component={CreatePost}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
