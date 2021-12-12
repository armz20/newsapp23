import React, { useState }from 'react';
import { useHistory } from "react-router-dom";

function Search() {
    const history = useHistory();
    const [searchVal, setSearchVal] = useState('');
          
    function onSearch(e,val) {
        e.preventDefault();
        history.push('/Results/'+val);
    }
    return (
        <div>
        <form>
            <label>
                <input type="text" name="search" onChange = {(e)=> setSearchVal(e.target.value)}/>
            </label>
            
            <input type="submit" value="Search" onClick={(e)=> onSearch(e,searchVal)} />
        </form>
        </div>
    )
}

export default Search;