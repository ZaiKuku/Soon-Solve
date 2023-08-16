/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tag from "./tags";
import style from "../styles/searchBar.module.scss";
import locations from "../locations/locations.js";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSideFilter } from "../redux/reducers";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const [searchLocations, setSearchLocations] = useState(["活大"]);
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
        <button onClick={() => dispatch(setOpenSideFilter(true))}>
          <i className="fa fa-sliders fa-xl" />
        </button>
        {tagItems(searchLocations)}
      </div>
      {showSearchResult && (
        <div className={style.searchResult}>
          <div className={style.searchResultTitle}>搜尋結果</div>
          {searchResult()}
        </div>
      )}
    </div>
    // <span>輸出</span>
  );
}
