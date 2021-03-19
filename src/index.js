import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import GLogin from "./components/GLogin"
import Auth from './components/Auth'
import SinglePost from './components/SinglePost'
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile'

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <Header/>
      <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/singlepost" component={SinglePost}/>
      <Route path="/auth" component={Auth}/>
      <Route path="/glogin" component={GLogin}/>
      <Route path="/createpost" component={CreatePost}/>
      <Route path="/leaderboard" component={Leaderboard}/>
      <Route path="/profile" component={Profile}/>
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
