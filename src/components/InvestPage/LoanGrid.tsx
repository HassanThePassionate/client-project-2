"use client";

import { useState } from "react";
import type { Loan } from "@/types/loan";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import style from "./invest.module.css";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GiftIcon from "../svgs/GiftIcon";
import { Progress } from "../ui/progress";

interface LoanGridProps {
  loans: Loan[];
}

export function LoanGrid({ loans }: LoanGridProps) {
  // Track current image index for each loan
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});

  // Get current image index for a loan (default to 0)
  const getCurrentIndex = (loanId: string) => currentImageIndex[loanId] || 0;

  // Navigate to previous image
  const prevImage = (loanId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [loanId]: (prev[loanId] - 1 + totalImages) % totalImages || 0,
    }));
  };

  // Navigate to next image
  const nextImage = (loanId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [loanId]: ((prev[loanId] || 0) + 1) % totalImages,
    }));
  };

  // Navigate to specific image
  const goToImage = (loanId: string, index: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [loanId]: index,
    }));
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 px-6'>
      {loans.map((loan) => {
        const currentIndex = getCurrentIndex(loan.id);
        const totalImages = loan.images.length;

        return (
          <div key={loan.id} className='overflow-hidden flex flex-col  '>
            <div className='relative h-48'>
              <img
                src={loan.images[currentIndex] || "/placeholder.svg"}
                alt={`${loan.type} image ${currentIndex + 1}`}
                className='w-full h-full rounded-[8px] object-cover transition-opacity duration-300'
              />
              <div className='absolute top-3 left-3 flex gap-2'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 hover:bg-green-100 font-medium uppercase'
                >
                  {loan.status}
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-white/90 text-gray-700 hover:bg-white font-medium'
                >
                  {loan.daysLeft} Days Left
                </Badge>
              </div>

              <button
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition-all duration-200 hover:scale-110'
                onClick={(e) => {
                  e.preventDefault();
                  prevImage(loan.id, totalImages);
                }}
              >
                <ChevronLeft className='h-5 w-5' />
              </button>

              <button
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition-all duration-200 hover:scale-110'
                onClick={(e) => {
                  e.preventDefault();
                  nextImage(loan.id, totalImages);
                }}
              >
                <ChevronRight className='h-5 w-5' />
              </button>

              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1'>
                {Array.from({ length: totalImages }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === currentIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToImage(loan.id, i);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className='p-4 flex flex-col gap-3'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='text-blue-600 font-semibold text-[13px]'>
                    #{loan.id}
                  </div>
                  <div className='font-semibold text-[13px]'>
                    {loan.type} - {loan.stage}
                  </div>
                </div>
                <img
                  src={loan.countryFlag || "/placeholder.svg"}
                  alt={loan.country}
                  className='w-6 h-6 rounded-full'
                />
              </div>

              <div className='flex items-center gap-1 text-sm'>
                <Badge variant='outline' className={style["table-badge"]}>
                  <span>
                    <GiftIcon />
                  </span>
                  Bonus Interest
                </Badge>
              </div>

              <div className='text-xs text-muted-foreground'>
                {loan.investors} investors
              </div>
              <div className='pt-1'>
                <Progress value={loan.fundingPercentage} className='h-2' />
              </div>
              <div className='flex justify-between text-xs'>
                <span className='font-medium'>
                  €{loan.amountRaised.toLocaleString()} raised
                </span>
                <span className='text-muted-foreground flex items-center'>
                  €{loan.amountLeft.toLocaleString()} left
                </span>
              </div>

              <div className='grid grid-cols-2 gap-x-6 gap-y-2 mt-1'>
                <div>
                  <div className='text-xs text-muted-foreground flex items-center'>
                    Amount
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className='h-3.5 w-3.5 ml-1 text-muted-foreground' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total loan amount</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className='font-medium text-sm mt-1'>
                    €{loan.amount.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className='text-xs mb-1 text-muted-foreground'>
                    Interest
                  </div>
                  <div className='font-medium text-xs'>{loan.interest}</div>
                </div>

                <div>
                  <div className='text-xs mb-1 text-muted-foreground  flex items-center'>
                    Period
                  </div>
                  <div className='font-medium text-xs'>
                    {loan.period} months
                  </div>
                </div>

                <div>
                  <div className='text-xs mb-1 text-muted-foreground flex items-center'>
                    Schedule
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className='h-3.5 w-3.5 ml-1 text-muted-foreground' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Payment schedule type</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className='font-medium text-xs'>{loan.scheduleType}</div>
                </div>

                <div>
                  <div className=' text-muted-foreground text-xs mb-1 flex items-center'>
                    Risk
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className='h-3.5 w-3.5 ml-1 text-muted-foreground' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Risk rating of the loan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Badge variant='outline' className={style["badge-3"]}>
                    {loan.risk}
                  </Badge>
                </div>
              </div>

              <Button className='w-full bg-blue-600 hover:bg-blue-700 mt-2'>
                Invest
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
