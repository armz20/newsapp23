import React from 'react'
import SearchBar from '../components/SearchBar'
import UserService from '../components/UserService'
import '../form.css';

const Newsfeed = () => {
    return (
        <div>
            <div className="search">
             <input type="text" placeholder="Enter news topics..."></input>
            <button className="searchbtn"> Search</button>
</div>
        <SearchBar/>
        <UserService/>
        </div>
    )
}

export default Newsfeed
