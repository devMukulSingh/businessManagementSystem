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
import { Billboard, Category } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/commons/Loader";

interface IcategoryFormProps {
  initialValues: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Category name is required",
  }),
  billboardId: z.string().min(1, {
    message: "Billboard is required",
  }),
});
type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<IcategoryFormProps> = ({
  initialValues,
  billboards,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const { storeId, categoryId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      billboardId: "",
    },
  });
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialValues) {
        const res = await axios.patch(
          `/api/${storeId}/category/${categoryId}`,
          data,
        );
        toast.success("Category updated");
      } else {
        const res = await axios.post(`/api/${storeId}/category`, data);
        toast.success("Category created");
        router.push(`/${storeId}/categories`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/category/${categoryId}`);
      if (res.status === 200) toast.success("Category deleted");
      else if (res.status === 500) toast.error("Something went wrong");
      setOpenDeleteAlert(false);
      router.push(`/${storeId}/categories`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleDeleteStore ${e}`);
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
        onConform={handleDeleteCategory}
      />
      <main className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">
              {initialValues ? `Edit Category` : `Create Category`}
            </h1>
            <p className="text-sm text-slate-500">
              Manage Category Preferences
            </p>
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
                    <FormLabel>Category Name</FormLabel>
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
                name="billboardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Billboard" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />

                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem value={billboard.id} key={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CategoryForm;
