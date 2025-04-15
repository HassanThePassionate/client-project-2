import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFormData } from "@/types/property";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  parish: z.string().min(1, { message: "parish is required" }),
  district: z.string().min(1, { message: "district is required" }),
  council: z.string().min(1, { message: "council is required" }),
  addressTwo: z.string().optional(),
  numberLot: z.string().optional(),
  floorApartment: z.string().optional(),
  postalCode: z.string().optional(),
});

interface LocationStepProps {
  data: Partial<PropertyFormData>;
  onNext: (data: Partial<PropertyFormData>) => void;
  onPrevious: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  data,
  onNext,
  onPrevious,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: data.country || "",
      city: data.city || "",
      addressTwo: data.addressTwo || "",
      numberLot: data.numberLot || "",
      floorApartment: data.floorApartment || "",
      postalCode: data.postalCode || "",
      parish: data.parish || "",
      district: data.district || "",
      council: data.council || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => onNext(values);

  return (
    <div className='space-y-6 py-8'>
      <div>
        <h2 className='text-2xl font-bold'>Location</h2>
        <p className='text-muted-foreground mt-2'>
          Please indicate the location of your property so we can better
          evaluate your property.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <Controller
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full !h-[44px] mt-2 cursor-pointer'>
                      <SelectValue placeholder='Select a country' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Portugal'>Portugal</SelectItem>
                    <SelectItem value='Spain'>Spain</SelectItem>
                    <SelectItem value='France'>France</SelectItem>
                    <SelectItem value='Germany'>Germany</SelectItem>
                    <SelectItem value='Italy'>Italy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col gap-6 w-full'>
            <div className='flex items-center gap-4 w-full'>
              <FormField
                control={form.control}
                name='district'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter District
name'
                        {...field}
                        className='w-full h-[44px] mt-2 '
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='council'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Council</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Council name'
                        {...field}
                        className='w-full h-[44px] mt-2'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-4 w-full'>
              <FormField
                control={form.control}
                name='parish'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Parish</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Parish name'
                        {...field}
                        className='w-full h-[44px] mt-2'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter city'
                        {...field}
                        className='w-full h-[44px] mt-2'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='addressTwo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Optional'
                    {...field}
                    className='w-full h-[44px] mt-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='numberLot'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number/Lot</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Optional'
                      {...field}
                      className='w-full h-[44px] mt-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='floorApartment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor/Apartment</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Optional'
                      {...field}
                      className='w-full h-[44px] mt-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder='####-###'
                    {...field}
                    className='w-full h-[44px] mt-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between pt-4'>
            <Button
              type='button'
              onClick={onPrevious}
              variant='outline'
              className='gap-2 cursor-pointer'
            >
              <ArrowLeft size={16} /> Anterior
            </Button>
            <Button type='submit' className='gap-2 cursor-pointer !px-6'>
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationStep;
