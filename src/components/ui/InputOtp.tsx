"use client";

import { useId, useState, useEffect } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function InputOtp() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const code = "1234";
  const navigate = useNavigate();
  const id = useId();

  useEffect(() => {
    if (value.length === 4) {
      if (value === code) {
        navigate("/admin/dashboard");
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  }, [value, code, navigate]);

  return (
    <div className='*:not-first:mt-2'>
      <Label htmlFor={id}>Enter Pin to login Admin</Label>

      <OTPInput
        id={id}
        value={value}
        onChange={setValue}
        containerClassName='flex items-center gap-3 has-disabled:opacity-50 w-full'
        maxLength={4}
        render={({ slots }) => (
          <div className='flex'>
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />

      {error && (
        <p className='text-red-500 text-sm mt-2'>
          Incorrect code. Please try again.
        </p>
      )}
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground relative -ms-px flex size-12 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
