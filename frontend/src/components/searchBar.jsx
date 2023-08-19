/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import Tag from "./tags";
import style from "../styles/searchBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSideFilter } from "../redux/reducers";
import { setSelectedTitle } from "@/redux/locationSlice";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const searchLocations = useSelector(
    (state) => state.selectedLocations.selectedLocations
  );

  const selectedSex = useSelector((state) => state.selectedLocations.sex);

  const selectedFriend = useSelector((state) => state.selectedLocations.friend);

  const debounceTimeout = 300; // 300 毫秒

  useEffect(() => {
    // 使用 setTimeout 計時器來實現 debounce
    const timerId = setTimeout(() => {
      dispatch(setSelectedTitle(keyword));
    }, debounceTimeout);

    // 在每次 useEffect 被重新調用時，清除之前的計時器
    return () => {
      clearTimeout(timerId);
    };
  }, [keyword]);

  const handleChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
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
        <div className="flex gap-2">
          {tagItems(searchLocations)}
          {selectedSex && <Tag inTag={selectedSex} />}
          {selectedFriend === 1 && <Tag inTag="朋友" />}
        </div>
      </div>
    </div>
    // <span>輸出</span>
  );
}
