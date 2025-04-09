"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  filterType?: "BAA1" | "BAA3" | "all";
}

export interface FilterState {
  interestRange: [number, number];
  loanPeriod: [number, number];
  scheduleTypes: string[];
  countries: string[];
  riskCategory: string;
  loanStatus: string[];
  excludeMyInvestments: boolean;
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  filterType = "all",
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    interestRange: [6, 14],
    loanPeriod: [6, 72],
    scheduleTypes: [],
    countries: [],
    riskCategory: "",
    loanStatus: [],
    excludeMyInvestments: false,
  });

  const scheduleTypeOptions = ["Annuity", "Bullet", "Full bullet"];
  const countryOptions = [
    "Estonia",
    "Latvia",
    "Lithuania",
    "Germany",
    "Finland",
    "Portugal",
    "Spain",
  ];
  const loanStatusOptions = ["Open", "Limited Availability", "Fully Invested"];

  // Full list of risk categories
  const allRiskCategories = [
    "AAA",
    "AA1",
    "AA2",
    "AA3",
    "A1",
    "A2",
    "A3",
    "BAA1",
    "BAA2",
    "BAA3",
    "BA1",
    "BA2",
    "BA3",
    "B1",
    "B2",
    "B3",
    "CAA1",
    "CAA2",
    "CAA3",
    "CA",
    "C",
  ];

  // Filter risk categories based on filterType prop
  const getRiskCategories = () => {
    if (filterType === "BAA1") {
      return ["BAA1"];
    } else if (filterType === "BAA3") {
      return ["BAA3"];
    } else {
      return allRiskCategories;
    }
  };

  const riskCategories = getRiskCategories();

  const handleScheduleTypeChange = (type: string) => {
    setFilters((prev) => {
      if (prev.scheduleTypes.includes(type)) {
        return {
          ...prev,
          scheduleTypes: prev.scheduleTypes.filter((t) => t !== type),
        };
      } else {
        return {
          ...prev,
          scheduleTypes: [...prev.scheduleTypes, type],
        };
      }
    });
  };

  const handleCountryChange = (country: string) => {
    setFilters((prev) => {
      if (prev.countries.includes(country)) {
        return {
          ...prev,
          countries: prev.countries.filter((c) => c !== country),
        };
      } else {
        return {
          ...prev,
          countries: [...prev.countries, country],
        };
      }
    });
  };

  const handleLoanStatusChange = (status: string) => {
    setFilters((prev) => {
      if (prev.loanStatus.includes(status)) {
        return {
          ...prev,
          loanStatus: prev.loanStatus.filter((s) => s !== status),
        };
      } else {
        return {
          ...prev,
          loanStatus: [...prev.loanStatus, status],
        };
      }
    });
  };

  const selectAll = (field: "scheduleTypes" | "countries" | "loanStatus") => {
    if (field === "scheduleTypes") {
      setFilters((prev) => ({
        ...prev,
        scheduleTypes: [...scheduleTypeOptions],
      }));
    } else if (field === "countries") {
      setFilters((prev) => ({ ...prev, countries: [...countryOptions] }));
    } else if (field === "loanStatus") {
      setFilters((prev) => ({ ...prev, loanStatus: [...loanStatusOptions] }));
    }
  };

  const clearAll = (
    field: "scheduleTypes" | "countries" | "loanStatus" | "all"
  ) => {
    if (field === "all") {
      setFilters({
        interestRange: [6, 14],
        loanPeriod: [6, 72],
        scheduleTypes: [],
        countries: [],
        riskCategory: "",
        loanStatus: [],
        excludeMyInvestments: false,
      });
    } else {
      setFilters((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 z-50 flex justify-end'>
      <div className='bg-white w-full max-w-md h-full overflow-y-auto animate-in slide-in-from-right'>
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-xl font-semibold'>Filters</h2>
          <button
            onClick={onClose}
            className='p-1 rounded-full hover:bg-gray-100 cursor-pointer'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='p-4 space-y-6'>
          {/* Interest Rate Slider */}
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-base font-medium'>Interest rate</span>
              <span className='text-base font-semibold text-gray-600'>
                {filters.interestRange[0]}% to {filters.interestRange[1]}%+
              </span>
            </div>
            <Slider
              defaultValue={filters.interestRange}
              min={6}
              max={14}
              step={1}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  interestRange: value as [number, number],
                }))
              }
              className='py-2'
            />
            <div className='flex justify-between text-sm text-gray-500'>
              <span>6</span>
              <span>14</span>
            </div>
          </div>

          {/* Loan Period Slider */}
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-base font-medium'>Loan period</span>
              <span className='text-base font-semibold text-gray-600'>
                {filters.loanPeriod[0]} to {filters.loanPeriod[1]} months
              </span>
            </div>
            <Slider
              defaultValue={filters.loanPeriod}
              min={6}
              max={72}
              step={1}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  loanPeriod: value as [number, number],
                }))
              }
              className='py-2'
            />
            <div className='flex justify-between text-sm text-gray-500'>
              <span>6</span>
              <span>72</span>
            </div>
          </div>

          {/* Schedule Type */}
          <Accordion type='single' collapsible defaultValue='schedule-type'>
            <AccordionItem value='schedule-type' className='border-b'>
              <AccordionTrigger className='text-base font-medium py-2'>
                Schedule type
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm text-[#234CFF]'>
                    <button
                      className='cursor-pointer'
                      onClick={() => selectAll("scheduleTypes")}
                    >
                      Select all
                    </button>
                    <button
                      className='cursor-pointer'
                      onClick={() => clearAll("scheduleTypes")}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {scheduleTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleScheduleTypeChange(type)}
                        className={`px-3 py-1.5 text-sm rounded-full cursor-pointer  border ${
                          filters.scheduleTypes.includes(type)
                            ? "bg-[#234CFF] border-[#234CFF] text-white"
                            : "bg-white border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Country */}
          <Accordion type='single' collapsible defaultValue='country'>
            <AccordionItem value='country' className='border-b'>
              <AccordionTrigger className='text-base font-medium py-2'>
                Country
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm text-[#234CFF]'>
                    <button
                      className='cursor-pointer'
                      onClick={() => selectAll("countries")}
                    >
                      Select all
                    </button>
                    <button
                      className='cursor-pointer'
                      onClick={() => clearAll("countries")}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {countryOptions.map((country) => (
                      <button
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className={`px-3 py-1.5 text-sm rounded-full border cursor-pointer ${
                          filters.countries.includes(country)
                            ? "bg-[#234CFF] border-[#234CFF] text-white"
                            : "bg-white border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Risk Category */}
          <Accordion type='single' collapsible defaultValue='risk-category'>
            <AccordionItem value='risk-category' className='border-b'>
              <AccordionTrigger className='text-base font-medium py-2'>
                Risk category
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm text-[#234CFF]'>
                    <button
                      className='cursor-pointer'
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, riskCategory: "" }))
                      }
                    >
                      Clear all
                    </button>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-sm'>Up to</span>
                    <Select
                      value={filters.riskCategory}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, riskCategory: value }))
                      }
                    >
                      <SelectTrigger className='w-32 cursor-pointer border-border h-[40px]'>
                        <SelectValue placeholder='Select...' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[180px]'>
                        {riskCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Loan Status */}
          <Accordion type='single' collapsible defaultValue='loan-status'>
            <AccordionItem value='loan-status' className='border-b'>
              <AccordionTrigger className='text-base font-medium py-2'>
                Loan status
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm text-[#234CFF]'>
                    <button
                      className='cursor-pointer'
                      onClick={() => selectAll("loanStatus")}
                    >
                      Select all
                    </button>
                    <button
                      className='cursor-pointer'
                      onClick={() => clearAll("loanStatus")}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {loanStatusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleLoanStatusChange(status)}
                        className={`px-3 py-1.5 text-sm rounded-full border cursor-pointer ${
                          filters.loanStatus.includes(status)
                            ? "bg-[#234CFF] border-[#234CFF] text-white"
                            : "bg-white border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Exclude My Investments */}
          <Accordion
            type='single'
            collapsible
            defaultValue='exclude-investments'
          >
            <AccordionItem value='exclude-investments' className='border-b'>
              <AccordionTrigger className='text-base font-medium py-2'>
                Exclude my investments
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex items-center space-x-2'>
                  <Switch
                    checked={filters.excludeMyInvestments}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        excludeMyInvestments: checked,
                      }))
                    }
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className='p-4 border-t flex justify-between sticky bottom-0 bg-white'>
          <Button variant='outline' onClick={() => clearAll("all")}>
            Clear all
          </Button>
          <Button
            className='bg-[#234CFF] hover:bg-indigo-700'
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
