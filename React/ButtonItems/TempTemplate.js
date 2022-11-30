import React from "react";
import './ItemTemplate.css';
import {MdCancel } from "react-icons/md";
import DefaultTemp from "./TempItems/TempItem";


const TempTemplate =() =>{

  return(
    <div className="Template">
    <div className="Header">
      <MdCancel />
      <DefaultTemp/>
      </div>
  </div>
  );
}
export default TempTemplate