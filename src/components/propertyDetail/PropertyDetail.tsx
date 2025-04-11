"use client";

import { useState, useEffect } from "react";

import { ChevronLeft } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import style from "./property.module.css";

// Import Swiper styles

import Stats from "./Stats";

import RiskAssessment from "./RiskAssessment";

import LoanTerms from "./LoanTerms";
import Documents from "./Documents";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "./Slider";

export default function PropertyLoanDetails() {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  if (pathname === "property-detail") document.body.style.background = "white";
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex-col flex gap-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-1 text-[#8e959e] max-w-[200px] text-base cursor-pointer hover:underline'
        >
          <ChevronLeft className='h-6 w-6 ' />
          Back
        </button>
        <h1 className='text-[28px] leading-[36px] font-semibold '>
          #42804873 Bridge loan - 1.stage (Estonia)
        </h1>
      </div>

      {/* Image Slider */}
      <div className='max-w-[888px] flex flex-col gap-6'>
        <div className={style.box}>
          <Slider />
          {/* Loan Stats */}
          <Stats />
        </div>

        {/* Risk Assessment */}
        <RiskAssessment />

        {/* Tabs */}
        <Tabs
          defaultValue='project-info'
          className='block !justify-start mt-6 mb-6'
        >
          <TabsList className=' w-full flex justify-start gap-6 flex-wrap mb-12 bg-transparent'>
            <TabsTrigger
              value='project-info'
              className='!bg-transparent !shadow-none cursor-pointer'
            >
              Project information
            </TabsTrigger>
            <TabsTrigger
              value='loan-terms'
              className='!bg-transparent !shadow-none cursor-pointer'
            >
              Loan terms
            </TabsTrigger>
            <TabsTrigger
              value='documents'
              className='!bg-transparent !shadow-none cursor-pointer'
            >
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value='project-info' className='p-4 mt-5'>
            <ul className='space-y-3 text-base'>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>
                  The loan is used to finance the purchasing of a property.
                </span>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>
                  The loan will be repaid by refinancing, from the sale of the
                  collateral property, or from the incoming business revenue.
                </span>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>The loan is secured with a first rank mortgage.</span>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>
                  Member of the management board of the borrower will provide a
                  personal surety in the full mortgage amount.
                </span>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <b>
                  Estateguru adds a 0.5% bonus to annual interest for
                  investments of at least €1,000.
                </b>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <b>
                  Estateguru adds a 1% bonus to annual interest for investments
                  of at least €5,000.
                </b>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>
                  The borrower plans to acquire additional capital if needed,
                  provided that the LTV does not exceed 70.5%.
                </span>
              </li>
              <li className='flex items-start text-base'>
                <span className='text-black mr-3'>•</span>
                <span>
                  The established mortgage will also cover additional stages of
                  financing. The LTV in the 1 stage is 70.5% and can increase to
                  70.5% in further stages.
                </span>
              </li>
            </ul>

            <div className='mt-6 text-base'>
              <h3 className='font-medium mb-2 text-base'>
                Project Information
              </h3>
              <p className='text-base mb-3 '>
                This property is located in Tallinn, Kristiine district, at
                Tulika 7a-4, a well-connected residential area near public
                transport, schools, and shopping centers.
              </p>

              <h3 className='font-semibold  my-4 text-lg'>Property Details:</h3>
              <ul className='space-y-2 text-base'>
                <li>
                  <strong>Type:</strong> Three-room apartment
                </li>
                <li>
                  <strong>Closed Net Area:</strong> 64.4 m²
                </li>
                <li>
                  <strong>Floor:</strong> Located on the 1st floor of a
                  three-story building.
                </li>
                <li>
                  <strong>Layout:</strong> Features a hall, living room and a
                  separate bedroom, kitchen, joint shower and WC room.
                </li>
                <li>
                  <strong>Condition:</strong> good condition, renovated over 10
                  years ago
                </li>
                <li>
                  <strong>Parking:</strong> Free parking on site and on Tulika
                  and surrounding streets
                </li>
              </ul>
              <h3 className='font-semibold  my-4 text-lg'>Building Details:</h3>
              <ul className='space-y-2 text-base'>
                <li>
                  <strong>Construction Year:</strong> 1947
                </li>
                <li>
                  <strong>Structure:</strong> Built with concrete blocks and
                  reinforced concrete floors.
                </li>
                <li>
                  <strong>Amenities:</strong> Equipped with central heating and
                  connected to centralized water and sewage systems.
                </li>
              </ul>
              <h3 className='font-semibold  my-4 text-lg'>
                Location Highlights:
              </h3>
              <ul className='space-y-2 text-base'>
                <li>
                  <strong>Proximity:</strong> Approximately 6 km from Tallinn
                  city center, bus and train connections to city center.
                </li>
                <li>
                  <strong>Amenities:</strong> Shops, parks, and services nearby
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value='loan-terms' className='p-4'>
            <LoanTerms />
          </TabsContent>

          <TabsContent value='documents' className='p-4'>
            <Documents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
