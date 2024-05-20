"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import Loader from "@/components/commons/Loader";
import { brandSchema } from "@/lib/formSchemas";
import BrandField from "./BrandField";
import useSWRMutation from "swr/mutation";

interface IclientFormProps {
  initialValues?: Brand | null;
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
async function createBrand(url: string, { arg }: { arg: ClientFormValues }) {
  return await axios.post(url, arg);
}
async function updateBrand(url: string, { arg }: { arg: ClientFormValues }) {
  return await axios.patch(url, arg);
}
async function deleteBrand(url: string) {
  return await axios.delete(url);
}
const BrandForm: React.FC<IclientFormProps> = ({ initialValues }) => {
  const { storeId, brandId } = useParams();
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const router = useRouter();
  const { trigger: createTrigger, isMutating: isMutatingCreate } =
    useSWRMutation(`/api/${storeId}/brand`, createBrand, {
      onSuccess() {
        toast.success("Brand created");
        router.push(`/${storeId}/brands`);
        router.refresh();
      },
      onError(err) {
        console.log(`Error in createBrand`, err);
      },
    });
  const { trigger: updateTrigger, isMutating: isMutatingUpdate } =
    useSWRMutation(`/api/${storeId}/brand/${brandId}`, updateBrand, {
      onSuccess() {
        toast.success("Brand updated");
        router.push(`/${storeId}/brands`);
        router.refresh();
      },
      onError(err) {
        console.log(`Error in updateBrand`, err);
        toast.error("Something went wrong");
      },
    });
  const { trigger: deleteTrigger, isMutating: isMutatingDelete } =
    useSWRMutation(`/api/${storeId}/brand/${brandId}`, deleteBrand, {
      onSuccess() {
        toast.success("Brand deleted");
        setOpenDeleteAlert(false);
        router.push(`/${storeId}/brands`);
        router.refresh();
      },
      onError(err) {
        console.log(`Error in deleteBrand`, err);
        toast.error("Something went wrong");
      },
    });
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialValues || {
      name: "",
    },
  });
  const onSubmit = async (data: ClientFormValues) => {
      if (initialValues) {
        updateTrigger(data);
      } else {
        createTrigger(data);
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
              {initialValues ? `Edit brand` : `Create brand`}
            </h1>
            <p className="text-sm">Manage brand Preferences</p>
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
              <BrandField
                form={form}
                loading={isMutatingCreate || isMutatingUpdate}
              />
              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={isMutatingCreate || isMutatingUpdate}
              >
                {initialValues ? "Save Changes" : "Create"}
                {(isMutatingCreate || isMutatingUpdate) && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BrandForm;
