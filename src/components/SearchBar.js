// import React from 'react'
// import "./SearchBar.css";
// import SearchIcon from '@material-ui/icons/Search';
// function SearchBar() {
//     return (
//         <div className="search">
//             <input type="text" placeholder="Enter news topics..."></input>
//             <button className="searchbtn"> Search</button>
//             <br></br>
//             <div className="article">
//             Article 1
//         </div>
//         <div className="article">
//             Article 2
//         </div>
//         <div className="article">
//             Article 3
//         </div>
//         </div>
//     )
// }

// export default SearchBar
import axios from "axios"
import { useEffect, useState } from "react"
const ShowNews = (props) => {
    const {articleObj} = props;
    console.log(articleObj)
    return (

        <div style={{textAlign: "center"}}
        >
            <h2 align="center" padding="20px"><a className={"titlelink"} href={articleObj.url}>{articleObj.title}</a></h2>
            <img width="50%" height="50%" src={articleObj.urlToImage}/><br></br><br></br>
        </div>
    )
}




const SearchBar = () => {
    const [articles, setArticles] = useState([]) 
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=0a1fa78c81c84b9b9427ced0a50bbc85&pageSize=10&category=business"

    useEffect(() => {
        getNews()
        
    }, [])
    const getNews = async() => {
        const result = await axios.get(url)
        setArticles(result.data.articles)

    }
    return (
       <div>
         {articles.map((articleObj) => <ShowNews articleObj = {articleObj} />)}
       </div>
     ) 
   }

   export default SearchBar