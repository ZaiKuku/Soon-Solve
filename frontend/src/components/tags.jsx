import style from "../styles/tags.module.scss";

export default function Tag({
  inTag = null,
  outTag = null,
  icon = "fa-solid fa-location-dot ",
}) {
  return (
    <div className={style.container}>
      <div className={style.tag}>
        <i className={icon} />
        {inTag && <span> {" " + inTag}</span>}
      </div>
      {outTag && <span> {" " + outTag}</span>}
    </div>
  );
}
