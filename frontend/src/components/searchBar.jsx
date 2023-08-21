/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import Tag from "./tags";
import style from "../styles/searchBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSideFilter } from "../redux/reducers";
import { cleanAll, setSelectedTitle } from "@/redux/locationSlice";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const searchLocations = useSelector(
    (state) => state.selectedLocations.selectedLocations
  );

  const selectedSex = useSelector((state) => state.selectedLocations.sex);

  const selectedFriend = useSelector((state) => state.selectedLocations.friend);

  const debounceTimeout = 300; // 300 毫秒

  const isMounted = useRef(false);
  console.log(isMounted);

  useEffect(() => {
    console.log(keyword);
    if (isMounted.current) {
      // 使用 setTimeout 計時器來實現 debounce
      const timerId = setTimeout(() => {
        dispatch(setSelectedTitle(keyword));
      }, debounceTimeout);
      console.log(
        "Component has been mounted before. Running useEffect logic."
      );

      // 在每次 useEffect 被重新調用時，清除之前的計時器
      return () => {
        clearTimeout(timerId);
      };
    } else {
      // Update the ref to indicate the component has been mounted
      console.log(
        "Component has been mounted for the first time. Updating isMounted."
      );
    }
  }, [keyword]);

  const handleChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    isMounted.current = true;
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
          onChange={(e) => handleChange(e)}
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
