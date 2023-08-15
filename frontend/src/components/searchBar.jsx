/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tag from "./tags";
import style from "../styles/searchBar.module.scss";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [searchLocations, setSearchLocations] = useState([
    "活大",
    "學餐",
    "總圖",
  ]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const handleChange = (e) => {
    if (e.target.value === "") {
      setShowSearchResult(false);
      return;
    }
    const keyword = e.target.value;
    setKeyword(keyword);
    setShowSearchResult(true);
  };

  // const handleClick = () => {
  //   setSearchLocations((prevLocations) => [...prevLocations, ...newLocation]);
  // };

  const tagItems = (searchLocations) => {
    return searchLocations.map((location) => (
      <Tag key={location} inTag={location} />
    ));
  };

  return (
    <div className={style.container}>
      <div className={style.searchBar}>
        <input
          type="text"
          placeholder="Search by Destination"
          onChange={handleChange}
        />
        <i className="fa fa-search "></i>
      </div>
      <div className={style.conditions}>
        <i className="fa fa-sliders fa-xl" />
        {tagItems(searchLocations)}
      </div>
    </div>
    // <span>輸出</span>
  );
}
