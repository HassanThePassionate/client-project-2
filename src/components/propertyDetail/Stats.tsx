import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import style from "./property.module.css";
import { Info } from "lucide-react";
import EstoniaFlag from "../svgs/EstoniaFlag";
import Progress from "./Progress";
import { cn } from "@/lib/utils";
const Stats = () => {
  return (
    <div className={cn("max-sm:!flex-col max-sm:!items-start", style.stats)}>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-4 '>
          <Progress />
          <div>
            <div className='text-center text-xs'>€14,328 left</div>
            <div className='text-center text-xs'>595 investors</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full gap-6'>
        <div className='flex w-full'>
          <div style={{ flex: "1 1 0%" }}>
            <span className='text-sm text-[#58626f] leading-[20px] pb-1  flex items-center'>
              Amount
            </span>
            <span className='text-lg font-medium leading-[28px] max-sm:text-sm'>
              €70,700
            </span>
          </div>

          <div style={{ flex: "1 1 0%" }}>
            <span className='text-sm text-[#58626f] leading-[20px] pb-1 flex items-center'>
              Period
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Loan period in months</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className='text-lg font-medium leading-[28px] max-sm:text-sm'>
              12 months
            </span>
          </div>
          <div style={{ flex: "1 1 0%" }}>
            <span className='text-sm text-[#58626f] leading-[20px] pb-1 flex items-center'>
              Interest
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Annual interest rate</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className='text-lg font-medium leading-[28px] max-sm:text-sm'>
              7.5%+1%
            </span>
          </div>
        </div>

        <div className='flex w-full'>
          <div style={{ flex: "1 1 0%" }}>
            <span className='text-sm text-[#58626f] leading-[20px] pb-1 flex items-center'>
              Country
            </span>
            <span className='text-lg font-medium leading-[28px] max-sm:text-sm flex items-center gap-1'>
              Estonia <EstoniaFlag />
            </span>
          </div>
          <div style={{ flex: "1 1 0%" }}>
            <span className='text-sm text-[#58626f] leading-[20px] pb-1 flex items-center'>
              Schedule type
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className='h-3 w-3 ml-1 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Payment schedule type</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className='text-lg font-medium leading-[28px] max-sm:text-sm'>
              Bullet
            </span>
            <div className='text-xs text-[#58626f]'>Quarterly payments</div>
          </div>
          <div style={{ flex: "1 1 0%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
