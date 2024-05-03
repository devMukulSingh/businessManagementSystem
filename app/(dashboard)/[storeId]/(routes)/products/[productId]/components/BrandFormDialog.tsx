"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/commons/Loader";
import { brandSchema } from "@/lib/formSchemas";
import BrandField from "../../../brands/[brandId]/components/BrandField";
import useSWRMutation from "swr/mutation";
interface BrandFormDialogProps{
  onClose : () => void;
}
export interface Iform {
  form: UseFormReturn<
    {
      name: string;
    },
    any,
    undefined
  >;
  loading?: boolean;
}
type ClientFormValues = z.infer<typeof brandSchema>;
interface Iarg{
  name:string
}
async function sendRequest(url:string, { arg } : { arg: Iarg}){
  await axios.post(url,arg )
}
const BrandFormDialog: React.FC<BrandFormDialogProps> = ({
  onClose
}) => {
  const { storeId } = useParams();
  const { isMutating, error, trigger } = useSWRMutation(
    `/api/${storeId}/brand`,
    sendRequest
  );
  const router = useRouter();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: ClientFormValues) => {
    try {
      await trigger(data);
      onClose();
      toast.success("Brand created");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    }
  };
  if (error) console.log("Error in create brand POST req", error);

  return (
    <>
      <div className="flex flex-col gap-6 px-10 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <BrandField form={form} loading={isMutating} />
              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={isMutating}
              >
                Create brand
                {isMutating && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BrandFormDialog;
