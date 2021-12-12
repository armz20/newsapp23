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
    console.log(id? true: false);

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
          
          Users:
          <div>
            {users.length > 0 && 
            <div>
              {users.map(function (user, index) {
                return (
                    
                  <div> <br></br> <ProfileHeader id={user[0]} name={user[1]} page="Results" index={index}/></div>
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
        <div>
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

