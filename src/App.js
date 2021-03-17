import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import GLogin from "./components/GLogin"
import Auth from './components/Auth'
import SinglePost from './components/SinglePost'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/glogin">Google Login</Link>
      <Link to="/auth">Auth</Link>
      <Link to="/singlepost">Single Post</Link>

      <Route exact path="/singlepost" component={SinglePost}/>
      <Route exact path="/auth" component={Auth}/>
      <Route exact path="/glogin" component={GLogin}/>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/createpost" component={CreatePost}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
