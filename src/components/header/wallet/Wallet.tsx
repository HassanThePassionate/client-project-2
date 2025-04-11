import WalletIcon from "@/components/svgs/WalletIcon";
import style from "./wallet.module.css";
import { cn } from "@/lib/utils";
const Wallet = () => {
  return (
    <a href='#' className={style.wallet}>
      <div className={cn("max-md:!text-black", style["wallet-content"])}>
        <span>€0</span>
        <span className='p-1'>
          <WalletIcon />
        </span>
      </div>
    </a>
  );
};

export default Wallet;
