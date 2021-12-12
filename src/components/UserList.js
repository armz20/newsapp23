import axios from "axios"
import { useEffect, useState } from "react"
import Search from "../search/Search";
import Profile from "../pages/profile";
import UserProfile from "./UserProfile";

const ShowNews = (props) => {
    const {articleObj} = props;
    console.log(articleObj)
    return (

        <div>
        <h2 padding="20px">{articleObj.followed_username}</h2>

        </div>
    )
}


const UserList = () => {
    
    var getUserId = function() {
        return localStorage.getItem('id');
    }
    var userID = localStorage.getItem('id');
    console.log(userID)
    const [articles, setArticles] = useState([]) 
    const url = `/api/follow/byuser/${getUserId()}/`;
    useEffect(() => {
        getNews()
        
    }, [])
    const getNews = async() => {
        const result = await axios.get(url)
        console.log(result)
        setArticles(result.data)
        

    }
    return (
       <div>
         {articles.map((articleObj) => <ShowNews articleObj = {articleObj} />)}
         <br></br>

        <Search/>
       </div>

     ) 
   }

   export default UserList