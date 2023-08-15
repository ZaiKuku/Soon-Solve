import style from "../styles/tags.module.scss";

export default function Tag() {
  return (
    <span className={style.tag}>
      <i className="fa-solid fa-location-dot" />
      {" 活大"}
    </span>
    // <span>輸出</span>
  );
}
