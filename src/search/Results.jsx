import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import UserSearchService from "../services/UserSearchService";
import ProfileHeader from "./ProfileHeader";
import '../profile.css';
import Follow from "../components/Follow";


function Results() {
  const location = useLocation();
  const history = useHistory();




  var userSearch = false;
  var postSearch = false;
  if (location.lookForUsers == true) {
    userSearch = true;
  }
  if (location.lookForPosts == true) {
    postSearch = true;
  }

  function redirect(page) { history.push("/" + page); }

  function profile(id) {
    history.push("/profile/" + id)
  }


  function Result() {
    let { id } = useParams();

    if (id) {
      userSearch = true;
      postSearch = true;

      var json = UserSearchService(id);
      var users = [];
      var temp = [];

      for (let i = 0; i < json.length; i++) {
        temp = [];
        Object.keys(json[i]).forEach(function (key) { temp.push(json[i][key]); });
        users.push(temp);
      }

      return (

        <div className="users">
          
          Users found:
          <div>
            {users.length > 0 && 
            <div>
              {users.map(function (user, index) {
                console.log(user[0])
                return (
                    
                  <div className="users1"> <ProfileHeader id={user[0]} name={user[1]} page="Results" index={index} /><Follow id={user[0]} /></div>
                )
              })}
            </div>}
          </div>
          {/*userSearch === true && id.length>0 &&
              <UserSearchService searchQ = {id}/> 
          */}
          
        </div>
      );
    }

    else { history.push("/home"); return (<div />); }
  }

  return (
    <Router>
      <div>
        <div className="users1">
          <Switch>
            <Route path="/Results/:id" children={<Result />} />
            <Route path="/Results" children={<Result />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Results;

