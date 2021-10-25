import React from 'react'
import "./SearchBar.css";
import SearchIcon from '@material-ui/icons/Search';
function SearchBar() {
    return (
        <div className="search">
            <input type="text" placeholder="Enter news topics..."></input>
        </div>
    )
}

export default SearchBar
