import React from "react";
import './ItemTemplate.css';
import {MdCancel } from "react-icons/md";
import FeedingItem from "./FeedingItems/FeedingItem";
import axios from 'axios';


const FeedingTemplate =() =>{

  return(
    <div className="Template">
    <div className="Header">
      <MdCancel />
      <FeedingItem/>
      </div>
  </div>
  );
}
export default FeedingTemplate