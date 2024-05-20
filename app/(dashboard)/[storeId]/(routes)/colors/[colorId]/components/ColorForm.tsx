"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import Loader from "@/components/commons/Loader";
import ColorName from "./ColorName";
const ColorValue = dynamic(() => import("./ColorValue"));
import { colorSchema } from "@/lib/formSchemas";
import dynamic from "next/dynamic";
import useSWRMutation from "swr/mutation";

interface IcolorFormProps {
  initialValues: Color | null;
}
export interface Iform {
  form: UseFormReturn<
    {
      value: string;
      name: string;
    },
    any,
    undefined
  >;
  loading?: boolean;
}
type colorFormValues = z.infer<typeof colorSchema>;
async function createColor(url: string, { arg }: { arg: colorFormValues }) {
  return await axios.post(url, arg);
}
async function updateColor(url: string, { arg }: { arg: colorFormValues }) {
  return await axios.patch(url, arg);
}
async function deleteColor(url: string) {
  return await axios.delete(url);
}
const ColorForm: React.FC<IcolorFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const { storeId, colorId } = useParams();
  const router = useRouter();

  const form = useForm<colorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialValues || {
      name: "",
      value: "",
    },
  });
   const { trigger: createTrigger, isMutating: isMutatingCreate } =
     useSWRMutation(`/api/${storeId}/color`, createColor, {
       onSuccess() {
         toast.success("color created");
         router.push(`/${storeId}/colors`);
         router.refresh();
       },
       onError(err) {
         console.log(`Error in createColor`, err);
       },
     });
   const { trigger: updateTrigger, isMutating: isMutatingUpdate } =
     useSWRMutation(`/api/${storeId}/color/${colorId}`, updateColor, {
       onSuccess() {
         toast.success("color updated");
         router.push(`/${storeId}/colors`);
         router.refresh();
       },
       onError(err) {
         console.log(`Error in updatecolor`, err);
         toast.error("Something went wrong");
       },
     });
   const { trigger: deleteTrigger, isMutating: isMutatingDelete } =
     useSWRMutation(`/api/${storeId}/color/${colorId}`, deleteColor, {
       onSuccess() {
         toast.success("color deleted");
         setOpenDeleteAlert(false);
         router.push(`/${storeId}/colors`);
         router.refresh();
       },
       onError(err) {
         console.log(`Error in deletecolor`, err);
         toast.error("Something went wrong");
       },
     });
  const onSubmit = async (data: colorFormValues) => {
      if (initialValues) {
        updateTrigger(data)
      } else {
        createTrigger(data)
      }
  };
  return (
    <>
      <AlertModal
        loading={isMutatingDelete}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={deleteTrigger}
      />
      <div className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">
              {initialValues ? `Edit color` : `Create color`}
            </h1>
            <p className="text-sm">Manage color Preferences</p>
          </section>
          <Button
            className={`${!initialValues ? "hidden" : ""}`}
            onClick={() => setOpenDeleteAlert(true)}
            disabled={isMutatingDelete}
            variant="destructive"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </header>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <ColorName
                form={form}
                loading={isMutatingCreate || isMutatingUpdate}
              />
              <ColorValue
                form={form}
                loading={isMutatingCreate || isMutatingUpdate}
              />
              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={isMutatingCreate || isMutatingUpdate}
              >
                {initialValues ? "Save Changes" : "Create"}
                {isMutatingCreate || (isMutatingUpdate && <Loader />)}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ColorForm;
