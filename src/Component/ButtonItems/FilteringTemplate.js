import React from "react";
import './ItemTemplate.css';
import {MdCancel } from "react-icons/md";
import FilteringItem from "./FilteringItems/FilteringItem";

const FilteringTemplate =() =>{

  return(
      <div className="Template">
        <div className="Header">
          <MdCancel />
          <FilteringItem/>
          </div>
      </div>
    );
}
export default FilteringTemplate