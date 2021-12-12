import React from 'react'
import SearchBar from '../components/SearchBar'
import UserService from '../components/UserService'
import { useHistory } from 'react-router-dom'

const Newsfeed = () => {
    



    return (
        <div>
        <SearchBar/>
        <UserService/>
        </div>
    )
}

export default Newsfeed
