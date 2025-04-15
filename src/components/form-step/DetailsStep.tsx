import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  feature: z.string().min(1, { message: " Please Select the Feature" }),
  featureList: z.array(z.string()).optional(),
});
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

interface DetailsStepProps {
  data: Partial<PropertyFormData>;
  onNext: (data: Partial<PropertyFormData>) => void;
  onPrevious: () => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({
  data,
  onNext,
  onPrevious,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feature: data.feature || "",
      featureList: data.featureList || [],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };
  const featuresOptions = [
    { id: "garage", label: "Garage" },
    { id: "elevator", label: "Elevator" },
    { id: "airConditioning", label: "Air conditioning" },
    { id: "privateGarden", label: "Private Garden" },
    { id: "privatePool", label: "Private Pool" },
    { id: "attic", label: "Attic" },
    { id: "cave", label: "Cave" },
    { id: "terrace", label: "Terrace" },
  ];

  return (
    <div className='space-y-6 py-8'>
      <div>
        <h2 className='text-2xl font-bold'>Details</h2>
        <p className='text-muted-foreground mt-2'>
          How would you describe your property according to its state of
          conservation?
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='feature'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Feature</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full !h-[44px] mt-2 cursor-pointer'>
                      <SelectValue placeholder='Select Features' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='new'>New</SelectItem>
                    <SelectItem value='used'>Used</SelectItem>
                    <SelectItem value='remodel'>To remodel</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='featureList'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-base'>
                    Select other relevant features:
                  </FormLabel>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {featuresOptions.map((feature) => (
                    <FormField
                      key={feature.id}
                      control={form.control}
                      name='featureList'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={feature.id}
                            className='flex flex-row items-center  space-x-3 space-y-0 border border-border p-4 rounded-lg'
                          >
                            <FormControl>
                              <Checkbox
                                className='h-6 w-6 rounded-full cursor-pointer '
                                checked={field.value?.includes(feature.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        feature.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== feature.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {feature.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between pt-4'>
            <Button
              type='button'
              onClick={onPrevious}
              variant='outline'
              className='gap-2 cursor-pointer '
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

export default DetailsStep;
