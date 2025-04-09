import { Link, useLocation } from "react-router-dom";
import style from "./menuItems.module.css";
import { cn } from "@/lib/utils";
const Item = ({ text, link }: { text: string; link: string }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <li>
      <Link
        to={link}
        className={cn(
          style["list-item"],
          pathname === link && "!text-[#c8d2ff]"
        )}
      >
        {text}
      </Link>
    </li>
  );
};

export default Item;
