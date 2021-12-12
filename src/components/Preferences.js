import React from 'react'
import '../form.css';
import { useEffect, useState } from "react"


const Preferences = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div>
            <h2 className="cathead">Choose your preferred categories:</h2>
            <form className='newsoptions'>
            <input type="checkbox" name='business'/>Business<br></br><br></br>
            <input type="checkbox" name='entertainment'/>Entertainment<br></br><br></br>
            <input type="checkbox" name='general'/>General<br></br><br></br>
            <input type="checkbox" name='health'/>Health<br></br><br></br>
            <input type="checkbox" name='science'/>Science<br></br><br></br>
            <input type="checkbox" name='sports'/>Sports<br></br><br></br>
            <input type="checkbox" name='technology'/>Technology<br></br><br></br>
            {/* <label>Business</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>Entertainment</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>General</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>Health</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>Science</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>Sports</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br>
            <label>Technology</label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}}/><br></br><br></br> */}
            </form>
        </div>
    )
}

export default Preferences
