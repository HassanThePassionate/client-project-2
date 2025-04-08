import ThreeDots from "@/components/svgs/ThreeDots";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import style from "@/components/header/notification/notification.module.css";
import SwitchIcon from "@/components/svgs/SwitchIcon";
import Users from "@/components/svgs/Users";
import AddNew from "@/components/svgs/AddNew";
import styles from "./profile.module.css";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={style.trigger}>
        <ThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[32px] max-h-[783px] overflow-y-auto bg-white rounded-[4px] px-2 py-2 flex flex-col gap-2 mr-6 '>
        <DropdownMenuItem className={styles.trigger}>
          <SwitchIcon />
          Switch Account
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.trigger}>
          <Users />
          Share account
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.trigger}>
          <AddNew />
          Add new account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
