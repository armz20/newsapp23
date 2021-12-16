import axios from "axios"
import { useEffect, useState } from "react"
import Search from "../search/Search";
import Profile from "../pages/profile";
import UserProfile from "./UserProfile";
import Follow from "./Follow";

const ShowNews = (props) => {
    const {articleObj} = props;
    return (

        <div>
        <h2 padding="20px">{articleObj.followed_username} <Follow id={articleObj.followed}/></h2>

        </div>
    )
}


const UserList = () => {
    
    var getUserId = function() {
        return localStorage.getItem('id');
    }
    var userID = localStorage.getItem('id');
    const [articles, setArticles] = useState([]) 
    const url = `/web/follow/byuser/${getUserId()}/`;
    useEffect(() => {
        getNews()
        
    }, [])
    const getNews = async() => {
        const result = await axios.get(url)
        setArticles(result.data)
        

    }
    return (
       <div>
         {articles.map((articleObj) => <ShowNews articleObj = {articleObj}  />) }
         
         <br></br>

        <Search/>
       </div> 

     ) 
   }

   export default UserList