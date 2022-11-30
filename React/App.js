
import './App.css';
import axios from 'axios';
import React, {useEffect} from 'react';
import { createGlobalStyle } from 'styled-components';
import Template from './Component/Template';
import ButtonTemplate from './Component/ButtonTemplate';
import TempTemplate from '../src/Component/ButtonItems/TempTemplate'
import FilteringTemplate from '../src/Component/ButtonItems/FilteringTemplate'
import FeedingTemplate from './Component/ButtonItems/FeedingTemplate'

import { useState
 } from 'react';
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const App =() => {
  
  const [result, setResult] = useState("defult");
  const [tempToggle, setTempToggle] = useState(false);
  const [filteringToggle, setFilteringToggle] = useState(false);
  const [feedingToggle, setFeedingToggle] = useState(false);

  const requestAPI = (route) => {
    
    if(route === "temperature_management"){
      setTempToggle(prev => !prev);
    }
    if(route === "filtering_management"){
      setFilteringToggle(prev => !prev);
    }
    if(route === "feeding_management"){
      setFeedingToggle(prev => !prev);
    }

    // e.preventDefault();
    console.log("버튼 동작 테스트");
    axios.get('http://192.168.85.136:8080/'+route)
        .then(response => {
          console.log(response)
          setResult(response.data)
        });
  }

  // const shutdownItem = () => {
  //   setTempToggle(false);
  //   setFilteringToggle(false);
  //   setFeedingToggle(false);
  // }
  return (
    <>
      <GlobalStyle />
      <Template>
        {tempToggle && (<TempTemplate/>)}
        {filteringToggle && (<FilteringTemplate />)}
        {feedingToggle && (<FeedingTemplate />)}

        <div onClick={()=>requestAPI("temperature_management")}><ButtonTemplate >수온</ButtonTemplate></div>
        <div onClick={()=>requestAPI("filtering_management")}><ButtonTemplate>탁도</ButtonTemplate> </div>
        <div onClick={()=>requestAPI("feeding_management")}><ButtonTemplate>먹이</ButtonTemplate> </div>
        </Template>
        <div>{result}</div>
    </>
  );
}

export default App;