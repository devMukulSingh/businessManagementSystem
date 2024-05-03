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

const BrandForm: React.FC<IclientFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, brandId } = params;
  const [loading, setLoading] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialValues || {
      name: "",
    },
  });
  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);
      if (initialValues) {
        const res = await axios.patch(`/api/${storeId}/brand/${brandId}`, data);
        toast.success("Brand updated");
      } else {
        const res = await axios.post(`/api/${storeId}/brand`, data);
        toast.success("Brand created");
        router.push(`/${storeId}/brands`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleBrandDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/brand/${brandId}`);
      if (res.status === 200) toast.success("Brand deleted");
      else if (res.status === 500) toast.error("Something went wrong");
      setOpenDeleteAlert(false);
      router.push(`/${storeId}/brands`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleBrandDelete ${e}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={handleBrandDelete}
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
            disabled={loading}
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
              <BrandField form={form} loading={loading} />
              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={loading}
              >
                {initialValues ? "Save Changes" : "Create"}
                {loading && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BrandForm;
