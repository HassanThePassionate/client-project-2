import Filter from "../svgs/Filter";
import ViewToggle from "./ViewToggle";
import Search from "../svgs/Search";
import { cn } from "@/lib/utils";
import style from "./invest.module.css";
import { useFilter } from "../context/filter-context";
import DownloadBtn from "../portfolioPage/DownloadBtn";
import { useLocation } from "react-router-dom";
const Filters = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setIsFilterModalOpen,
  } = useFilter();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className={cn("!justify-end", style.filters)}>
      <div className='  max-sm:max-w-[400px] gap-3 px-6 flex justify-end flex-wrap self-start'>
        <div className={cn("max-[370px]:ma-w-[290px]", style.search)}>
          <span className='text-[#8e959e] mr-3'>
            <Search />
          </span>
          <input
            placeholder='Search for loan ID'
            className={style.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        <div>
          <button
            className={style["filter-button"]}
            onClick={() => setIsFilterModalOpen(true)}
          >
            <span>
              <Filter />
            </span>
            Filter
          </button>
        </div>
        {path === "/invest"}
        <DownloadBtn />
      </div>
    </div>
  );
};

export default Filters;
