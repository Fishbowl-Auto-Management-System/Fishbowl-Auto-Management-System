import React, { useState } from "react";
import './ItemTemplate.css';
import {VscDebugStart} from "react-icons/vsc";
import {AiOutlineEnter} from "react-icons/ai";
import axios from 'axios';

const DefaultTemp =() => {
    const [nowValue, setNowValue] = useState('');
    const [diffValue, setDiffValue] = useState('');
    const [rotationValue, setRotationValue] = useState('');
    const [defaultTemp, setDefaultTemp] = useState('a')
    const requestAPI1 = () =>{
	// input 값 들어오게 하기
	var test = defaultTemp
        axios.get('http://localhost:8000/default_temperature/'+test)
        .then(response => {
	  console.log("supposed to be end_point")
          console.log(response.data)
	  if (response.data !== "end_point"){
	    console.log("response error")
	  }
        });
    }

    const requestAPI2 = () =>{
        axios.get("http://localhost:8000/"+"temperature_management")
        .then(response => {
          console.log(response)
	  console.log('response.data ::'+response.data)
	  let data_list = response.data.split('/')
	  console.log('data_list[0] ::'+ data_list[0])
	  setNowValue(data_list[0])
	  console.log('data_list[1] ::'+ data_list[1])
	  setDiffValue(data_list[1])
	  console.log('data_list[2] ::'+ data_list[2])
	  setRotationValue(data_list[2])
        });
    }
const onChange=(e)=>{
    const {value} = e.target;
    setDefaultTemp(value)
}
    return(
        <>
            <div>
                <div className="list">
                    기본온도설정
                    <input type = "text" name="value" value={defaultTemp} onChange={onChange}/>
                    <button onClick={requestAPI1}>확인</button>
                </div>
               	<div style={{'color': 'black'}}>{typeof(defaultTemp)}</div> 
                <div className="list">
                    수온측정시작
                    <button onClick={requestAPI2}>
                        시작
                        </button>
                </div>
		
                <div>
                    현재온도:{nowValue}, 온도차이:{diffValue},회전각도:{rotationValue} 
                </div>
            </div>
        </>
    )
}

export default DefaultTemp;
