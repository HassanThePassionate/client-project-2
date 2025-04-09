"use client";

import { useState } from "react";
import style from "./dashboard.module.css";
import { cn } from "@/lib/utils";
import Toggle from "./Toggle";
import FileSearch from "../svgs/FileSearch";
import Briefcase from "../svgs/Briefcase";
import { Link } from "react-router-dom";

type InvestmentType = "active" | "finish";

interface Investment {
  id: string;
  name: string;
  amount: number;
  date: string;
  status: InvestmentType;
}

interface InvestmentDashboardProps {
  title?: string;
  investments?: Investment[];
  className?: string;
}

export default function InvestmentDashboard({
  title = "Your latest investments",
  investments = [],
  className,
}: InvestmentDashboardProps) {
  const [activeTab, setActiveTab] = useState<InvestmentType>("active");
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter investments based on active tab and any additional filters
  const filteredInvestments = investments.filter(
    (investment) => investment.status === activeTab
  );

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className={cn("w-full rounded-lg border bg-white ", className)}>
      <div className='mb-6 flex items-center justify-between py-7 px-6'>
        <h2 className='text-2xl font-semibold text-gray-900'>{title}</h2>
        <Toggle onChange={setActiveTab} viewMode={activeTab} />
      </div>

      <div className='flex min-h-[428px] flex-col items-center justify-center'>
        {filteredInvestments.length > 0 ? (
          <div className='w-full'>
            {/* Investment list would go here */}
            <ul className='space-y-4'>
              {filteredInvestments.map((investment) => (
                <li
                  key={investment.id}
                  className='rounded-lg border p-4 transition-colors hover:bg-gray-50'
                >
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='font-medium'>{investment.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {new Date(investment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>
                        ${investment.amount.toLocaleString()}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          investment.status === "active"
                            ? "text-blue-600"
                            : "text-green-600"
                        )}
                      >
                        {investment.status === "active"
                          ? "In progress"
                          : "Completed"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          Object.keys(filters).length === 0 &&
          activeTab === "active" && (
            <div className='flex flex-col items-center justify-center text-center gap-6'>
              <div className=' flex w-[42px] items-center justify-center '>
                <FileSearch />
              </div>
              <div className='flex flex-col'>
                <h3 className='mb-2 text-[20px] font-semibold leading-[28px]'>
                  No matching results
                </h3>
                <p className='mb-4 text-sm text-gray-500 flex flex-col'>
                  Adjust your filters or
                  <button
                    onClick={clearAllFilters}
                    className='text-purple-600 hover:underline'
                  >
                    clear all filters
                  </button>
                </p>
              </div>
            </div>
          )
        )}
        {activeTab === "finish" && (
          <div className='flex flex-col items-center justify-center text-center gap-6'>
            <div className=' flex  w-[60px] h-[60px] items-center justify-center'>
              <Briefcase />
            </div>
            <div className='flex flex-col items-center'>
              <h4 className='mb-6 text-2xl font-semibold leading-[32px]'>
                You don't have finished investments
              </h4>
              <Link to='/invest' className={style.btn}>
                Invest
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
