"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { PhoneInput } from "./PhoneInput";
import { PasswordInput } from "./PasswordInput";
import { submitContactForm } from "@/lib/form-action";
import Heading from "./Heading";
import { Link } from "react-router-dom";

// Form validation schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Número de telefone inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  location: z.string().min(2, { message: "Localização é obrigatória" }),
  objective: z.string().min(2, { message: "Objetivo é obrigatório" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+351");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      location: "",
      objective: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Format phone with country code
      const formattedData = {
        ...data,
        phone: `${countryCode} ${data.phone}`,
      };

      await submitContactForm(formattedData);
      setSubmitSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const objectiveOptions = [
    "Investidor",
    "Encontro Oportunidades",
    "Parceria",
    "Outro",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 bg-[#F2F9F699] p-7 rounded-[24px] lg:max-w-[45%] shadow-sm'
    >
      <Heading title='Junta-te a nós' />
      {submitSuccess && (
        <Alert className='bg-green-50 border-green-200 text-green-800'>
          <CheckCircle2 className='h-4 w-4 text-green-600' />
          <AlertDescription>Formulário enviado com sucesso!</AlertDescription>
        </Alert>
      )}

      {submitError && (
        <Alert variant='destructive'>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <div className='space-y-2'>
        <Label htmlFor='fullName'>Nome Completo:</Label>
        <Input
          id='fullName'
          placeholder='António Maria Santos e Silva'
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
          className='bg-white h-[52px] rounded-[12px] shadow-none'
        />
        {errors.fullName && (
          <p className='text-sm text-red-500'>{errors.fullName.message}</p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address:*</Label>
          <Input
            id='email'
            type='email'
            placeholder='antoniomariappt@gmail.com'
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            required
            className='bg-white h-[52px] rounded-[12px] shadow-none'
          />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number:*</Label>
          <PhoneInput
            id='phone'
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            {...register("phone")}
            placeholder='933 587 994'
            aria-invalid={errors.phone ? "true" : "false"}
            required
          />
          {errors.phone && (
            <p className='text-sm text-red-500'>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password:*</Label>
        <PasswordInput
          id='password'
          placeholder='Enter your password'
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
          required
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='location'>Localização:*</Label>
          <Input
            id='location'
            placeholder='Lisboa'
            {...register("location")}
            aria-invalid={errors.location ? "true" : "false"}
            required
            className='bg-white h-[52px] rounded-[12px] shadow-none'
          />
          {errors.location && (
            <p className='text-sm text-red-500'>{errors.location.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='objective'>Qual é o teu objetivo:*</Label>
          <Select
            onValueChange={(value) => {
              const event = {
                target: { name: "objective", value },
              } as React.ChangeEvent<HTMLSelectElement>;
              register("objective").onChange(event);
            }}
          >
            <SelectTrigger
              className='bg-white cursor-pointer !h-[52px] rounded-[12px] shadow-none w-full truncate'
              id='objective'
              aria-invalid={errors.objective ? "true" : "false"}
            >
              <SelectValue placeholder='Investidor ou Encontro Oportunidades' />
            </SelectTrigger>
            <SelectContent>
              {objectiveOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.objective && (
            <p className='text-sm text-red-500'>{errors.objective.message}</p>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='w-full bg-[#23614E] hover:bg-[#23614ed8] text-white cursor-pointer h-[56px] rounded-[20px] mt-4'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />A enviar...
          </>
        ) : (
          "Enviar Contacto"
        )}
      </Button>
      <div className='text-base  font-medium text-center'>
        If you have already account?{" "}
        <Link
          to='/login'
          className='text-[#23614E] underline hover:text-[#23614ed0]'
        >
          Login
        </Link>
      </div>
    </form>
  );
}
