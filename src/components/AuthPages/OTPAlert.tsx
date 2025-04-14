import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputOtp from "../ui/InputOtp";

const OTPAlert = () => {
  return (
    <Popover>
      <PopoverTrigger className='ml-2 cursor-pointer hover:underline'>
        Admin
      </PopoverTrigger>
      <PopoverContent>
        <InputOtp />
      </PopoverContent>
    </Popover>
  );
};

export default OTPAlert;
