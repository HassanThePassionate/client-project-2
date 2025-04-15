import React from "react";
import { FormStep, formSteps, stepLabels } from "@/types/property";
import { cn } from "@/lib/utils";
import {
  MapPin,
  LayoutGrid,
  ClipboardList,
  FileText,
  Image,
  Building,
  UserSquare,
  Check,
} from "lucide-react";

interface PropertyFormSidebarProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
  completedSteps: number;
}

const getStepIcon = (step: FormStep) => {
  switch (step) {
    case "location":
      return <MapPin className='h-5 w-5' />;
    case "features":
      return <LayoutGrid className='h-5 w-5' />;
    case "details":
      return <ClipboardList className='h-5 w-5' />;
    case "documents":
      return <FileText className='h-5 w-5' />;
    case "photos":
      return <Image className='h-5 w-5' />;
    case "business":
      return <Building className='h-5 w-5' />;
    case "personalData":
      return <UserSquare className='h-5 w-5' />;
  }
};

const PropertyFormSidebar: React.FC<PropertyFormSidebarProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  return (
    <div className='w-[250px] bg-slate-800 text-white h-screen p-6 flex flex-col'>
      <h1 className='text-xl font-bold mb-8'>Sell your property</h1>

      <div className='space-y-2'>
        {formSteps.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isCurrent = currentStep === step;
          const isClickable = index <= completedSteps + 1;

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 py-3 px-4 rounded-md transition-colors",
                isCurrent
                  ? "bg-slate-700"
                  : isClickable
                  ? "text-slate-300 hover:bg-slate-700/50 cursor-pointer"
                  : "text-slate-500 opacity-60 cursor-not-allowed",
                isCompleted && !isCurrent && "border-l-2 border-green-500"
              )}
              onClick={() => isClickable && onStepClick(step)}
            >
              <div className='flex items-center gap-3'>
                {isCompleted ? (
                  <div className='text-green-500'>
                    <Check className='h-5 w-5' />
                  </div>
                ) : (
                  getStepIcon(step)
                )}
                <span>{stepLabels[step]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFormSidebar;
