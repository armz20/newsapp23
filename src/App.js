import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Newsfeed from './pages';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Profile from './pages/profile';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Newsfeed} />
        <Route path="/newsfeed" exact component={Newsfeed} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/profile" exact component={Profile} />
        </Switch>
    </Router>
  );
}

export default App;
