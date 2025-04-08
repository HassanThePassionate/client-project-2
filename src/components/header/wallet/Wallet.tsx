import WalletIcon from "@/components/svgs/WalletIcon";
import style from "./wallet.module.css";
const Wallet = () => {
  return (
    <a href='#' className={style.wallet}>
      <div className={style["wallet-content"]}>
        <span>€0</span>
        <span className='p-1'>
          <WalletIcon />
        </span>
      </div>
    </a>
  );
};

export default Wallet;
