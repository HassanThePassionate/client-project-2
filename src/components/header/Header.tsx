import Separator from "../ui/Separator";
import style from "./header.module.css";
import Logo from "./Logo";
import MenuItems from "./menuItems/MenuItems";
import Notification from "./notification/Notification";
import Profile from "./profile/Profile";
import Wallet from "./wallet/Wallet";
const Header = () => {
  return (
    <header className={style.header}>
      <div className='flex items-center gap-[40px]'>
        <Logo />
        <MenuItems />
      </div>
      <div className='flex items-center gap-6'>
        <Wallet />
        <Separator className='w-[1px] h-6 bg-[#58626f]' />
        <Notification />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
