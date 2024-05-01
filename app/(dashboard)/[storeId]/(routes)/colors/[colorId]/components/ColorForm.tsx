"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
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

interface IcolorFormProps {
  initialValues: Color | null;
}

const formSchema = z.object({
  value: z.string().trim().min(1, {
    message: "Color value is required",
  }),
  name: z.string().trim().min(1, {
    message: "Color name is required",
  }),
});
type colorFormValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<IcolorFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, colorId } = params;
  const [loading, setLoading] = useState(false);

  const form = useForm<colorFormValues>({
    resolver: zodResolver(formSchema),
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
      <main className="flex flex-col gap-6 px-10 py-2">
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hex value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="value"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

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
      </main>
    </>
  );
};

export default ColorForm;
