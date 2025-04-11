// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import style from "./property.module.css";
import GiftIcon from "../svgs/GiftIcon";
import Eye from "../svgs/Eye";
const Slider = () => {
  return (
    <div className='relative h-[500px] sm:h-[560px]'>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        className='h-[500px]'
      >
        <SwiperSlide>
          <img
            src='https://beta.estateguru.co/_next/image?url=https%3A%2F%2Fs3-eu-west-1.amazonaws.com%2Feg-us-public-bucket-prod%2Floan%2FEE42804873%2FloanImage_1435.JPG&w=1920&q=75'
            alt='Kitchen view'
            className='w-full h-full object-cover rounded-b-[8px]'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://beta.estateguru.co/_next/image?url=https%3A%2F%2Fs3-eu-west-1.amazonaws.com%2Feg-us-public-bucket-prod%2Floan%2FEE42804873%2FloanImage_512.JPG&w=1920&q=75'
            alt='Property view'
            className='w-full h-full object-cover rounded-b-[8px]'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://beta.estateguru.co/_next/image?url=https%3A%2F%2Fs3-eu-west-1.amazonaws.com%2Feg-us-public-bucket-prod%2Floan%2FEE42804873%2FloanImage_1447.JPG&w=1920&q=75'
            alt='Another view'
            className='w-full h-full object-cover rounded-b-[8px]'
          />
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation buttons */}
      <button className='swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white rounded-sm  shadow-md'>
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button className='swiper-button-next absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white rounded-sm  shadow-md'>
        <ChevronRight className='h-5 w-5' />
      </button>

      {/* Badges */}
      <div className='absolute top-4 left-4 z-10 flex items-center bg-white rounded-[4px] border-2 border-white '>
        <div className={style.badge}>Open</div>
        <span className=' text-[11px] text-[#58626f] px-2   flex items-center'>
          <Clock className='h-4 w-4 mr-1' />4 Days Left
        </span>
      </div>
      <div className='absolute top-4 right-4 z-10 flex gap-2 max-sm:hidden '>
        <div className={style.badge2}>
          <GiftIcon />
          Up to 1% Bonus interest
        </div>
        <div className={style.badge}>
          <Eye />
          <span>Viewed by 194 investors</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
