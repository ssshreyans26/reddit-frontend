import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import GLogin from "./components/GLogin"
import Auth from './components/Auth'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/glogin">Google Login</Link>
      <Link to="/auth">Auth</Link>

      <Route exact path="/auth" component={Auth}/>
      <Route exact path="/glogin" component={GLogin}/>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/createpost" component={CreatePost}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
