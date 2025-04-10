"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Loan } from "@/types/loan";
import { Badge } from "@/components/ui/badge";
import style from "./invest.module.css";
import GiftIcon from "../svgs/GiftIcon";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
interface LoanListProps {
  loans: Loan[];
  sortField: keyof Loan;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof Loan) => void;
}

export function LoanList({
  loans,
  sortField,
  sortDirection,
  onSort,
}: LoanListProps) {
  const SortIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;
  const navigate = useNavigate();
  const renderSortableHeader = (field: keyof Loan, label: string) => (
    <th
      className='p-4 text-left text-xs text-[#58626f] cursor-pointer font-normal '
      onClick={() => onSort(field)}
    >
      <div className='flex items-center gap-1'>
        {label}
        {sortField === field && <SortIcon className='h-4 w-4' />}
      </div>
    </th>
  );

  return (
    <div className=' overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-[#f9fafb] text-sm'>
            <tr>
              <th className='p-4 text-left text-xs text-[#58626f] font-normal h-[50px] '>
                Listing Date
              </th>
              {renderSortableHeader("status", "Status")}
              {renderSortableHeader("amount", "Amount")}
              {renderSortableHeader("interest", "Interest")}
              {renderSortableHeader("period", "Period")}
              {renderSortableHeader("scheduleType", "Schedule type")}

              <th className='p-4 text-left text-xs text-[#58626f] font-normal'>
                Risk
              </th>
              <th className='p-4 text-left text-xs text-[#58626f] font-normal'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {loans.map((loan) => (
              <tr key={loan.id} className='hover:bg-muted/30'>
                <td className='px-4 py-4'>
                  <div className='flex gap-6'>
                    <div className='w-[124px] h-[86px] rounded-[4px] overflow-hidden'>
                      <img
                        src={loan.images[0] || "/placeholder.svg"}
                        alt={loan.type}
                        className='w-full h-full object-cover '
                      />
                    </div>
                    <div className='space-y-1 min-w-[245px]'>
                      <div className='flex items-center gap-2'>
                        <span className='text-[#244CFF] text-[13px] font-semibold'>
                          #{loan.id}
                        </span>
                        <span className='text-[13px] font-semibold'>
                          {loan.type} - {loan.stage}
                        </span>
                      </div>
                      <div className='flex items-center gap-1 text-sm'>
                        <Badge
                          variant='outline'
                          className={style["table-badge"]}
                        >
                          <span>
                            <GiftIcon />
                          </span>
                          Bonus Interest
                        </Badge>
                      </div>
                      <div className='text-[11px] mt-2 text-muted-foreground'>
                        {loan.investors} investors
                      </div>
                      <div className='pt-1'>
                        <Progress
                          value={loan.fundingPercentage}
                          className='h-2'
                        />
                      </div>
                      <div className='flex justify-between text-[11px]'>
                        <span>
                          €{loan.amountRaised.toLocaleString()} raised
                        </span>
                        <span className='text-muted-foreground'>
                          €{loan.amountLeft.toLocaleString()} left
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-4'>
                  <Badge
                    variant='outline'
                    className={cn(
                      "uppercase",
                      style["badge-2"],
                      loan.status === "Fully Invested" &&
                        "!text-[#212f40] !bg-[#daeef7]"
                    )}
                  >
                    {loan.status}
                  </Badge>
                  <div className='text-shadow-2 text-xs mt-2 text-muted-foreground'>
                    {loan.daysLeft} days left
                  </div>
                </td>
                <td className='px-4 py-4 text-sm'>
                  €{loan.amount.toLocaleString()}
                </td>
                <td className='px-4 py-4 text-sm'>{loan.interest}</td>
                <td className='px-4 py-4 text-sm text-center'>
                  {loan.period} mon
                </td>
                <td className='px-4 py-4 text-sm text-center'>
                  {loan.scheduleType}
                </td>
                <td className='px-4 py-4'>
                  <Badge
                    variant='outline'
                    className={cn(
                      loan.risk !== "BAA1" &&
                        loan.risk !== "BAA2" &&
                        "!bg-[#f2d777]",
                      style["badge-3"]
                    )}
                  >
                    {loan.risk}
                  </Badge>
                </td>
                <td className='px-4 py-4'>
                  <Button
                    onClick={() => navigate("/property-detail")}
                    className='bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  >
                    Invest
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
