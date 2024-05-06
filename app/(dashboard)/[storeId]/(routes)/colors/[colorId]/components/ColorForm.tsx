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
const ColorValue = dynamic( () => import("./ColorValue"))
import { colorSchema } from "@/lib/formSchemas";
import dynamic from "next/dynamic";

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

const ColorForm: React.FC<IcolorFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, colorId } = params;
  const [loading, setLoading] = useState(false);

  const form = useForm<colorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialValues || {
      name: "",
      value: "",
    },
  });
  const onSubmit = async (data: colorFormValues) => {
    try {
      setLoading(true);
      if (initialValues) {
        const res = await axios.patch(`/api/${storeId}/color/${colorId}`, data);
        toast.success("color updated");
      } else {
        const res = await axios.post(`/api/${storeId}/color`, data);
        toast.success("color created");
        router.push(`/${storeId}/colors`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleColorDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/color/${colorId}`);
      if (res.status === 200) toast.success("Color deleted");
      else if (res.status === 500) toast.error("Something went wrong");
      setOpenDeleteAlert(false);
      router.push(`/${storeId}/colors`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleColorDelete ${e}`);
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
        onConform={handleColorDelete}
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
              <ColorName form={form} loading={loading} />
              <ColorValue form={form} loading={loading} />
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

export default ColorForm;
