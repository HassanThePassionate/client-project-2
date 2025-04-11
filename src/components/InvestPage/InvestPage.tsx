"use client";

import { useEffect, useState } from "react";
import style from "./invest.module.css";
import type { Loan } from "@/types/loan";
import { LoanList } from "./LoanList";
import { LoanGrid } from "./LoanGrid";
import { getLoanData } from "@/constant/LoanData";
import { FilterModal, type FilterState } from "./FilterModal";
import Filters from "./Filters";
import { useFilter } from "../context/filter-context";

const InvestPage = () => {
  const { searchQuery, viewMode, setIsFilterModalOpen, isFilterModalOpen } =
    useFilter();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [sortField, setSortField] = useState<keyof Loan>("listingDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    interestRange: [6, 14],
    loanPeriod: [6, 72],
    scheduleTypes: [],
    countries: [],
    riskCategory: "",
    loanStatus: [],
    excludeMyInvestments: false,
  });

  useEffect(() => {
    // Load loan data
    const data = getLoanData();
    setLoans(data);
    setFilteredLoans(data);
  }, []);

  useEffect(() => {
    // Filter loans based on search query and active filters
    let filtered = loans.filter(
      (loan) =>
        loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply filters
    if (activeFilters.scheduleTypes.length > 0) {
      filtered = filtered.filter((loan) =>
        activeFilters.scheduleTypes.includes(loan.scheduleType)
      );
    }

    if (activeFilters.countries.length > 0) {
      filtered = filtered.filter((loan) =>
        activeFilters.countries.includes(loan.country)
      );
    }

    if (activeFilters.loanStatus.length > 0) {
      filtered = filtered.filter((loan) =>
        activeFilters.loanStatus.includes(loan.status)
      );
      console.log("Filtered loans by status:", filtered);
      console.log(
        "Active status filters:",
        activeFilters.loanStatus.includes("Open")
      );
    }

    if (activeFilters.riskCategory) {
      filtered = filtered.filter(
        (loan) => loan.risk === activeFilters.riskCategory
      );
    }

    // Filter by interest rate
    filtered = filtered.filter((loan) => {
      const interestValue = Number.parseFloat(loan.interest.replace("%", ""));
      return (
        interestValue >= activeFilters.interestRange[0] &&
        interestValue <= activeFilters.interestRange[1]
      );
    });

    // Filter by loan period
    filtered = filtered.filter(
      (loan) =>
        loan.period >= activeFilters.loanPeriod[0] &&
        loan.period <= activeFilters.loanPeriod[1]
    );

    // Sort loans
    const sorted = [...filtered].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
      return 0;
    });

    setFilteredLoans(sorted);
  }, [loans, searchQuery, sortField, sortDirection, activeFilters]);

  const handleSort = (field: keyof Loan) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  // Function to change the filter type

  return (
    <div>
      <div>
        <h1 className='text-[28px] font-semibold leading-[36px] mb-4'>
          Manual investments
        </h1>
        <div className='bg-white border border-[#eaecee] rounded-[8px] '>
          <div className='flex flex-col gap-8 mb-4'>
            <div className='flex flex-col px-6 pt-5 pb-3'>
              <div className='flex items-center gap-2'>
                <h2 className='sm:text-[28px] text-lg font-semibold leading-[36px]'>
                  Loans available to invest
                </h2>
                <span className={style.badge}>
                  {filteredLoans.length} open loans
                </span>
              </div>
            </div>
            <Filters />
          </div>
          {viewMode === "list" ? (
            <LoanList
              loans={filteredLoans}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          ) : (
            <LoanGrid loans={filteredLoans} />
          )}
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default InvestPage;
