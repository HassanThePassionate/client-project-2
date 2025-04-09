import { portfolioData } from "@/constant/portfolioData";
import style from "./portfolio.module.css";
import PortfolioItem from "./PortfolioItem";
import InvestmentDashboard from "../dashboardPage/InvestmentBoard";
const PortfolioPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className={style.wrapper}>
        {portfolioData.map((item, i) => (
          <PortfolioItem
            key={i}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
          />
        ))}
      </div>
      <InvestmentDashboard title='Invested loans' doubleFilters />
    </div>
  );
};

export default PortfolioPage;
