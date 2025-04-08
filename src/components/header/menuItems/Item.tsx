import style from "./menuItems.module.css";
const Item = ({ text }: { text: string }) => {
  return (
    <li>
      <a href='#' className={style["list-item"]}>
        {text}
      </a>
    </li>
  );
};

export default Item;
