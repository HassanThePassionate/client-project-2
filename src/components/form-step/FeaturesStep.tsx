import React from "react";
import { useForm } from "react-hook-form";
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
  propertyType: z.string().min(1, { message: "Property type is required" }),
  rooms: z.coerce.number().min(0, { message: "Enter number of Rooms" }),
  construction: z.coerce
    .number()
    .min(0, { message: "Enter Year of Construction" }),
  area: z.coerce.number().min(1, { message: "Area is required" }),
});

interface FeaturesStepProps {
  data: Partial<PropertyFormData>;
  onNext: (data: Partial<PropertyFormData>) => void;
  onPrevious: () => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({
  data,
  onNext,
  onPrevious,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: data.propertyType || "",
      rooms: data.rooms || 0,
      construction: data.construction || 0,
      area: data.area || 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };

  return (
    <div className='space-y-6 py-8'>
      <div>
        <h2 className='text-2xl font-bold'>Features</h2>
        <p className='text-muted-foreground mt-2'>
          Describe your property according to its attributes such as number of
          bedrooms, areas and year of construction.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='propertyType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full !h-[44px] mt-2 cursor-pointer'>
                      <SelectValue placeholder='Select property type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='apartment'>Apartment</SelectItem>
                    <SelectItem value='house'>Housing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='rooms'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Rooms</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Number of Rooms'
                      {...field}
                      className='h-[44px] mt-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='construction'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Construction</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Year of Construction'
                      {...field}
                      className='h-[44px] mt-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='area'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (m²)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={1}
                      placeholder='Property area'
                      {...field}
                      className='h-[44px] mt-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-between pt-4'>
            <Button
              type='button'
              onClick={onPrevious}
              variant='outline'
              className='gap-2 cursor-pointer'
            >
              <ArrowLeft size={16} /> Anterior
            </Button>
            <Button type='submit' className='gap-2 !px-6 cursor-pointer'>
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FeaturesStep;
