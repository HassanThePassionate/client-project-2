export interface Document {
  name: string;
  url: string;
}
export interface PropertyFormData {
    // Location step
    country: string;
    city: string;
    addressTwo?: string;
    numberLot?: string;
    floorApartment?: string;
    postalCode?: string;
    parish?: string;
    district?: string;
    council?: string;
    
    
    // Features step
    propertyType?: string;
    rooms?: number;
    construction?: number;
    area?: number;

    
    // Details step
    feature?: string;
    featureList?: string[];
  
    
    // Other steps placeholders
    documents?: Document[];
    photos?: string[];
    businessInfo?: Record<string, string>;
    personalData?: Record<string, string>;
  }
  
  export type FormStep = 
    | "location" 
    | "features" 
    | "details" 
    | "documents" 
    | "photos" 
    | "business" 
    | "personalData";
  
  export const formSteps: FormStep[] = [
    "location",
    "features",
    "details",
    "documents",
    "photos",
    "business",
    "personalData"
  ];
  
  export const stepLabels: Record<FormStep, string> = {
    location: "Location",
    features: "Features",
    details: "Details",
    documents: "Documents",
    photos: "Photos",
    business: "Business",
    personalData: "Personal Data"
  };