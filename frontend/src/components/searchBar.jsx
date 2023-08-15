import style from "../styles/searchBar.module.scss";

export default function SearchBar() {
  return (
    <div className={style.searchBar}>
      <input type="text" placeholder="Search by Destination" />
      <button type="submit">
        <i className="fa fa-search "></i>
      </button>
    </div>
    // <span>輸出</span>
  );
}
