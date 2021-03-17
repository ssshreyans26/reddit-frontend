import { BrowserRouter, Link } from "react-router-dom";
// import Header from './components/Header';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <BrowserRouter>

      <Link to="/">DashBoard</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/glogin">Google Login</Link>
      <Link to="/auth">Auth</Link>
      <Link to="/singlepost">Single Post</Link>
      </BrowserRouter>
    </div>
  );
}

export default App;

