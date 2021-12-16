import React, { useEffect, useState }from 'react';
import {Link } from "react-router-dom";
import parse from 'html-react-parser';

function loadSearchUser(callback, searchQ) {
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://localhost:8000/web/searchUser/?search='+searchQ
  const responseType = "json"
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function() {
    callback({"message":"Error"},400)
  }
  xhr.send()
}

function UserSearch(props) {
  const {user} = props
  console.log(user);
  return( 
    <>
        <div>
          <Link to={'/dm/' + JSON.stringify(user.id)}> {parse(user.username)} </Link>
        </div>
    </>
  );
}

function UserSearchService(searchQ) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const myCallback = (results, status) => {
      if(status === 200) {
        // console.log(results)
        setUsers(results)
      }
    }
    loadSearchUser(myCallback, searchQ)
  }, [])
  return users;
}

export default UserSearchService;