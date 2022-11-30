import React, { useState } from "react";
import axios from 'axios';

const FilteringItem =()=>{

    const [value,setValue] = useState()

    const requestAPI = () =>{
        axios.get('http://192.168.85.136:8080/'+"filtering_management")
        .then(response => {
          console.log(response)
          setValue(response.data)
        });
    }

    return(
        <>
        <div>
            <button onClick={()=>{requestAPI()}}>시작</button>
        </div>
            <div>
                {value}
            </div>
        </>
        )
}

export default FilteringItem