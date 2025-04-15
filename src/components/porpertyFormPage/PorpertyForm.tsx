import React, { useState } from "react";
import { PropertyFormData, FormStep, formSteps } from "@/types/property";

import { toast } from "react-toastify";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import LocationStep from "../form-step/LocationStep";
import FeaturesStep from "../form-step/FeaturesStep";
import DetailsStep from "../form-step/DetailsStep";
import DefaultStep from "../form-step/DefaultStep";
import PropertyFormSidebar from "./PorpertySidebar";
import DocumentStep from "../form-step/DocumentStep";

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<PropertyFormData>>({});
  const [currentStep, setCurrentStep] = useState<FormStep>("location");
  const [formErrors, setFormErrors] = useState<Record<FormStep, string | null>>(
    {
      location: null,
      features: null,
      details: null,
      documents: null,
      photos: null,
      business: null,
      personalData: null,
    }
  );

  const currentStepIndex = formSteps.indexOf(currentStep);

  const validateStep = (
    step: FormStep,
    data: Partial<PropertyFormData>
  ): boolean => {
    switch (step) {
      case "location": {
        const locationValid = !!data.country && !!data.city;
        setFormErrors((prev) => ({
          ...prev,
          location: locationValid
            ? null
            : "Please fill out all required location fields.",
        }));
        return locationValid;
      }
      case "features": {
        const featuresValid =
          !!data.propertyType && data.area !== undefined && data.area > 0;
        setFormErrors((prev) => ({
          ...prev,
          features: featuresValid
            ? null
            : "Please select a property type and enter a valid area.",
        }));
        return featuresValid;
      }
      case "details": {
        const detailsValid = !!data.feature && !!data.featureList;
        setFormErrors((prev) => ({
          ...prev,
          details: detailsValid
            ? null
            : "Please provide a title, description, and valid price.",
        }));
        return detailsValid;
      }
      default:
        return true;
    }
  };

  const handleNext = (stepData: Partial<PropertyFormData>) => {
    const updatedData = { ...formData, ...stepData };

    const isStepValid = validateStep(currentStep, updatedData); // 👈 use updatedData

    if (isStepValid) {
      setFormData(updatedData); // ab baad mein update karo

      if (currentStepIndex < formSteps.length - 1) {
        const nextStep = formSteps[currentStepIndex + 1];
        setCurrentStep(nextStep);
        toast.success("Step completed. Your progress has been saved.");
      } else {
        handleSubmit();
      }
    } else {
      toast.error(
        formErrors[currentStep] ||
          "Please complete all required fields before proceeding."
      );
    }
  };

  const handlePrevious = () => {
    // Move to previous step if not on first step
    if (currentStepIndex > 0) {
      const prevStep = formSteps[currentStepIndex - 1];
      setCurrentStep(prevStep);
    }
  };

  const handleSidebarItemClick = (step: FormStep) => {
    const clickedStepIndex = formSteps.indexOf(step);

    const isCurrentStepValid = validateStep(currentStep, formData); // ✅ pass formData

    if (
      clickedStepIndex < currentStepIndex ||
      (clickedStepIndex === currentStepIndex + 1 && isCurrentStepValid) ||
      clickedStepIndex === currentStepIndex
    ) {
      setCurrentStep(step);
    } else if (clickedStepIndex > currentStepIndex) {
      toast.error(
        "Please complete the current step before proceeding further."
      );
    }
  };

  const handleSubmit = () => {
    // Final form submission - this would typically send data to an API
    toast.success("Your property listing has been submitted successfully.");
    console.log("Form submitted with data:", formData);
  };

  // Render appropriate step component based on current step
  const renderStepContent = () => {
    const currentError = formErrors[currentStep];

    const errorAlert = currentError ? (
      <Alert variant='destructive' className='my-6 border-red-500'>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>{currentError}</AlertDescription>
      </Alert>
    ) : null;

    switch (currentStep) {
      case "location":
        return (
          <>
            {errorAlert}
            <LocationStep
              data={formData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        );
      case "features":
        return (
          <>
            {errorAlert}
            <FeaturesStep
              data={formData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        );
      case "details":
        return (
          <>
            {errorAlert}
            <DetailsStep
              data={formData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        );
      case "documents":
        return (
          <>
            {errorAlert}
            <DocumentStep
              data={formData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        );
      default:
        // For steps not yet implemented
        return (
          <>
            {errorAlert}
            <DefaultStep
              title={currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
              onNext={() => handleNext({})}
              onPrevious={handlePrevious}
            />
          </>
        );
    }
  };

  return (
    <div className='flex min-h-screen w-full'>
      <PropertyFormSidebar
        currentStep={currentStep}
        onStepClick={handleSidebarItemClick}
        completedSteps={currentStepIndex}
      />
      <div className='flex-1 px-8 pt-[80px]'>
        <div className='max-w-2xl mx-auto'>{renderStepContent()}</div>
      </div>
    </div>
  );
};

export default PropertyForm;
