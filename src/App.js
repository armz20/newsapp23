import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Newsfeed from './pages';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Profile from './pages/profile';
import Login from './pages/login';
import Results from './search/Results';
import Preferences from './components/Preferences';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Newsfeed} />
        <Route path="/newsfeed" exact component={Newsfeed} />
        <Route path="/api/register"  exact url="http://127.0.0.1:8000/api/register/"/>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/preferences" exact component={Preferences} />
        <Route path="/results" exact component={() => <Results />} />
        <Route path="/results/:id" exact component={() => <Results />} />

        </Switch>
    </Router>
  );
}

export default App;
