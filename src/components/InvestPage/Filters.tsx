import Filter from "../svgs/Filter";
import ViewToggle from "./ViewToggle";
import Search from "../svgs/Search";
import { cn } from "@/lib/utils";
import style from "./invest.module.css";
import { useFilter } from "../context/filter-context";
const Filters = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setIsFilterModalOpen,
  } = useFilter();
  return (
    <div className={cn("!justify-end", style.filters)}>
      <div className='min-w-[456px] gap-3 px-6 flex justify-end self-start'>
        <div className={style.search}>
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
      </div>
    </div>
  );
};

export default Filters;
