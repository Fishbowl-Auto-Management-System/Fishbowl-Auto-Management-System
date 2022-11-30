import React, { useState } from "react";
import './ItemTemplate.css';
import {VscDebugStart} from "react-icons/vsc";
import {AiOutlineEnter} from "react-icons/ai";
import axios from 'axios';

const DefaultTemp =() => {

    const [vlaue, setValue] = useState()
    const [defualtTemp, setDefaultTemp] = useState()
    const requestAPI1 = () =>{
        axios.get('http://192.168.85.136:8080/'+"temperature_management")
        .then(response => {
          console.log(response)
          setValue(response.data)
        });
    }

    const requestAPI2 = () =>{
        axios.get('http://192.168.85.136:8080/'+"temperature_management")
        .then(response => {
          console.log(response)
          setValue(response.data)
        });
    }
const onChange=(e)=>{
    const {value} = e.target;
    setValue(value)
}
    return(
        <>
            <div>
                <div className="list">
                    기본온도설정
                    <input type = "text" name="value" value={vlaue} onChange={onChange}/>
                    <button onClick={()=>{requestAPI1()}}>확인</button>
                </div>
                
                <div className="list">
                    수온측정시작
                    <button onClick={()=>{requestAPI2()}}>
                        시작
                        </button>
                </div>

                <div>
                    {vlaue}
                </div>
            </div>
        </>
    )
}

export default DefaultTemp;