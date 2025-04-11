import { Info } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import style from "@/components/InvestPage/invest.module.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RiskAssessment = () => {
  return (
    <div className='pt-0 flex flex-col gap-4'>
      <h2 className='font-medium mb-3 text-2xl leading-[32px]'>
        Risk assessment
      </h2>
      <div className='flex gap-6 p-6 max-sm:flex-col border border-[#e1e3e5] rounded-[8px]'>
        <div className='flex w-full'>
          <div style={{ flex: "1 1 0%" }}>
            <div className='text-sm text-[#58626f] flex items-center gap-1 pb-1 leading-5'>
              Projected LTV
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white p-1 rounded-md'>
                    <p className='text-xs'>Loan-to-Value ratio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='font-medium text-base leading-7'>Up to 70%</div>
          </div>

          <div style={{ flex: "1 1 0%" }}>
            <div className='text-sm text-[#58626f] flex items-center gap-1 pb-1 leading-5'>
              Risk category
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white p-1 rounded-md'>
                    <p className='text-xs'>Risk level of the investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='font-medium'>
              <span
                className={cn(
                  "!bg-[#f2d777] p-1 px-2 text-xs rounded-sm",
                  style.badge1
                )}
              >
                B+/A
              </span>
            </div>
          </div>
        </div>
        <div className='flex w-full'>
          <div style={{ flex: "1 1 0%" }}>
            <div className='text-sm text-[#58626f] flex items-center gap-1 pb-1 leading-5'>
              Mortgage rank
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white p-1 rounded-md'>
                    <p className='text-xs'>Mortgage priority ranking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='font-medium text-base leading-7'>First rank</div>
          </div>

          <div style={{ flex: "1 1 0%" }}>
            <div className='text-sm text-[#58626f] flex items-center gap-1 pb-1 leading-5'>
              Surety/ship
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white p-1 rounded-md'>
                    <p className='text-xs'>Additional guarantees</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='font-medium flex items-center '>
              Yes
              <Popover>
                <PopoverTrigger className='text-blue-600 text-sm mt-0.5 ml-1 cursor-pointer leading-5'>
                  View details
                </PopoverTrigger>
                <PopoverContent className='max-w-[344px] w-full p-3'>
                  <h4 className='text-sm'>Additional suretyship</h4>

                  <div className='flex mt-2 items-center justify-between text-xs text-gray-500'>
                    Personal suretyship
                    <span>Yes</span>
                  </div>

                  <div className='flex mt-2 items-center justify-between text-xs text-gray-500'>
                    Company suretyship
                    <span>No</span>
                  </div>

                  <p className='text-[13px] border-t text-gray-500 mt-2 pt-2'>
                    Member of the management board of the borrower Inga
                    Išganaitis will provide a personal surety in the full
                    mortgage amount.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
