import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import MenuItems from "./menuItems/MenuItems";
import Wallet from "./wallet/Wallet";

const MobileView = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='md:hidden block p-2'>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <MenuItems />
        <DropdownMenuSeparator />
        <Wallet />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileView;
