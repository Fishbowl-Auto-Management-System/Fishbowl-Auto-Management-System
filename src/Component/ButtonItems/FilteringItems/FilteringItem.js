import React, { useState } from "react";
import axios from 'axios';

const FilteringItem =()=>{

    const [value,setValue] = useState()
    const requestAPI = () =>{
	axios.get('http://localhost:8000/'+"filtering_management")
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
	    	아두이노 출력값.
                {value}
            </div>
        </>
        )
}

export default FilteringItem
