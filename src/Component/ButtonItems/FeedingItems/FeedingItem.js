import React, { useState} from "react";
import axios from 'axios';


const FeedingItem =()=>{

    const [value,setValue] = useState()

    const requestAPI = () =>{
        axios.get('http://localhost:8000/'+"feeding_management")
        .then(response => {
          console.log(response)
          setValue(response.data)
        });
    }
    return(
        <>
        <div>
            <button onClick={requestAPI}>시작</button>
        </div>
            <div>
	    feeding_management
                {value}
            </div>
        </>
        )
}

export default FeedingItem
