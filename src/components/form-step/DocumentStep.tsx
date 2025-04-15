import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PropertyFormData } from "@/types/property";

interface Document {
  name: string;
  url: string;
}

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [".pdf", ".doc", ".docx", ".txt"];

const formSchema = z.object({
  documents: z
    .array(
      z.object({
        name: z.string().min(1, "Document name is required"),
        url: z.string().url("Invalid document URL"),
      })
    )
    .min(1, "At least one document is required"),
});

interface DocumentStepProps {
  data: Partial<PropertyFormData>;
  onNext: (data: Partial<PropertyFormData>) => void;
  onPrevious: () => void;
}

function DocumentStep({ data, onNext, onPrevious }: DocumentStepProps) {
  const [documents, setDocuments] = useState<Document[]>(data.documents || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: documents,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Validate file size and type
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("documents", {
          message: `${file.name} is too large. Maximum size is 5MB.`,
        });
        return false;
      }

      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      if (!ACCEPTED_FILE_TYPES.includes(fileExtension)) {
        form.setError("documents", {
          message: `${
            file.name
          } has an invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES.join(
            ", "
          )}`,
        });
        return false;
      }

      return true;
    });

    const newDocuments: Document[] = validFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setDocuments((prev) => {
      const updated = [...prev, ...newDocuments];
      form.setValue("documents", updated);
      return updated;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (index: number) => {
    setDocuments((prev) => {
      const newDocs = [...prev];
      URL.revokeObjectURL(newDocs[index].url);
      newDocs.splice(index, 1);
      form.setValue("documents", newDocs);
      return newDocs;
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext({ documents: values.documents });
  };

  return (
    <div className='space-y-6 py-8'>
      <div>
        <h2 className='text-2xl font-bold'>Documents</h2>
        <p className='text-muted-foreground mt-2'>
          To estimate the value of your property, we will need the Urban
          Property Register (CPU). This document can be obtained, free of
          charge, through the{" "}
          <a
            className='text-[#0d9488] underline'
            target='_blank'
            href='https://www.portaldasfinancas.gov.pt/at/html/index.html'
          >
            Tax Portal
          </a>
          .
          <br />
          <br />
          You may choose not to upload the document now and submit it later. We
          will be here to remind you if you do not do so now.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <label>Please upload the following documents</label>
          <div className=' p-4 py-0 bg-white border border-border rounded-lg mt-4'>
            <div className='mb-6  '>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept={ACCEPTED_FILE_TYPES.join(",")}
                multiple
              />
              <Button
                type='button'
                onClick={handleUploadClick}
                variant='secondary'
                className='flex items-center justify-between w-full h-full   shadow-none !py-6 !pb-0 !bg-transparent cursor-pointer'
              >
                <div className='flex gap-4'>
                  <FileText size={24} />
                  <div className='flex flex-col text-sm pb-1'>
                    <span className='text-sm font-medium text-left'>CPU</span>
                    Urban Property Booklet
                  </div>
                </div>
                <Upload size={20} className='text-[#0d9488]' />
              </Button>
              {form.formState.errors.documents && (
                <p className='text-red-500 text-sm mt-2'>
                  {form.formState.errors.documents.message}
                </p>
              )}
            </div>

            <div className='space-y-3'>
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-sm font-medium text-gray-700'>
                      {doc.name}
                    </span>
                  </div>
                  <Button
                    type='button'
                    onClick={() => handleDelete(index)}
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                  >
                    <X size={20} className='text-gray-500' />
                  </Button>
                </div>
              ))}
            </div>
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
}

export default DocumentStep;
