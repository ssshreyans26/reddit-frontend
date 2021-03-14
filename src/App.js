import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import GoogleLogin from "./components/GoogleLogin"
import Auth from './components/Auth'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/googlelogin">Google Login</Link>
      <Link to="/auth">Auth</Link>

      <Route exact path="/auth" component={Auth}/>
      <Route exact path="/googlelogin" component={GoogleLogin}/>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/createpost" component={CreatePost}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
