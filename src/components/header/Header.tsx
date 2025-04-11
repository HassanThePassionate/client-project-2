import Separator from "../ui/Separator";
import style from "./header.module.css";
import Logo from "./Logo";
import MenuItems from "./menuItems/MenuItems";
import MobileView from "./MobileView";
import Notification from "./notification/Notification";
import Profile from "./profile/Profile";
import Wallet from "./wallet/Wallet";
const Header = () => {
  return (
    <header className={style.header}>
      <div className='flex items-center gap-[40px]'>
        <Logo />
        <div className='max-md:hidden block'>
          <MenuItems />
        </div>
      </div>
      <div className='flex items-center gap-2 sm:gap-6'>
        <div className='max-md:hidden block'>
          <Wallet />
        </div>
        <Separator className='w-[1px] h-6 bg-[#58626f] max-md:hidden block' />
        <Notification />
        <Profile />
        <MobileView />
      </div>
    </header>
  );
};

export default Header;
