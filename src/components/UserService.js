import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from 'js-cookie';

const UserService = () => {
  const [users, setUsers] = useState([]);
  const [follow, setFollow] = useState(false);
  const [followText, setFollowText] = useState("Follow");
  const url = "/web/users/"
    useEffect(() => {
        getData();
    }, []);
  
    const getData = async () => {
      const result = await axios.get(url);
      checkUser(result.data);
    //   setUsers(result.data);
    //   checkUser(result.data)
    };



    
    const checkUser = (data) => {
        for(var index = 0; index < data.length; index++){
            console.log(data[index].id)

            if(data[index].username == localStorage.getItem("username")){
                localStorage.setItem('id',data[index].id)
            }
        }
    }
    console.log(localStorage.getItem("id"))

    // const handleFollow = ( id ) => {
    //     const csrftoken = Cookies.get('csrftoken')
    //     let form_data = new FormData();
    //     form_data.append("followed", id)
    //     axios.post("/api/follow/", form_data, {
    //     headers: {
    //     'Content-Type':'application/json',
    //     'X-CSRFToken':csrftoken,
    //     }
    //     })
    //         .then(res => {
    //             setFollowText("Unfollow");
    //             setFollow(true);
    //             getData();         
    //         })
    //     .catch(err => console.log(err))
    // }

    // const handleUnfollow = ( id ) => {
    //     const csrftoken = Cookies.get('csrftoken')
    //     axios.delete(`/api/follow/${id}/`, {
    //     headers: {
    //     'Content-Type':'application/json',
    //     'X-CSRFToken':csrftoken,
    //     }
    //     })
    //         .then(res => {
    //             setFollowText("Follow");
    //             setFollow(false)
    //             getData();
    //         })
    //     .catch(err => console.log(err))
    // }
    return (
        <span>
            {/* {follow ? <button onClick={()=>handleUnfollow(id)}>{followText}</button> : <button onClick={()=>handleFollow(id)}>{followText}</button>} */}
        </span>
    )
}

export default UserService;