"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Color, Product } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import Loader from "@/components/commons/Loader";
import { productSchema } from "@/lib/formSchemas";
import ProductName from "./formFields/ProductName";
import Brands from "./formFields/Brands";
import Colors from "./formFields/Colors";
import Price from "./formFields/Price";
import Quantity from "./formFields/Quantity";
import useSWRMutation from "swr/mutation";
export interface IinitialValues {
  name: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  colorId: string | undefined;
  brandId: string | undefined;
}
interface IproductFormProps {
  initialValues: IinitialValues | null;
  colors: Color[];
  brands: Brand[];
}
export interface Iform {
  form: UseFormReturn<
    {
      name: string;
      price: number;
      quantity: number;
      colorId: string;
      brandId: string;
    },
    any,
    undefined
  >;
  loading?: boolean;
  colors?: Color[];
  brands?: Brand[];
}
type productFormValues = z.infer<typeof productSchema>;

async function createProduct(url: string, { arg }: { arg: productFormValues }) {
  return axios.post(url, arg);
}
async function updateProduct(url: string, { arg }: { arg: productFormValues }) {
  return axios.patch(url, arg);
}
async function deleteProduct(url: string) {
  return axios.delete(url);
}

const ProductForm: React.FC<IproductFormProps> = ({
  initialValues,
  colors,
  brands,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, productId } = params;
  const form = useForm<productFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : {
          name: "",
          price: 0,
          quantity: 1,
          colorId: "",
          brandId: "",
        },
  });
  const { trigger: createTrigger, isMutating: isMutatingCreate } =
    useSWRMutation(`/api/${storeId}/product`, createProduct, {
      onSuccess() {
        toast.success("product created");
        router.push(`/${storeId}/products`);
        router.refresh();
      },
      onError(e) {
        toast.error("Something went wrong");
        console.log(`Error in createProduct`, e);
      },
    });
  const { trigger: updateTrigger, isMutating: isMutatingUpdate } =
    useSWRMutation(`/api/${storeId}/product/${productId}`, updateProduct, {
      onSuccess() {
        toast.success("product updated");
        router.push(`/${storeId}/products`);
        router.refresh();
      },
      onError(e) {
        toast.error("Something went wrong");
        console.log(`Error in updateProduct`, e);
      },
    });
  const { trigger: deleteTrigger, isMutating: isMutatingDelete } =
    useSWRMutation(`/api/${storeId}/product/${productId}`, deleteProduct, {
      onSuccess() {
        setOpenDeleteAlert(false);
        toast.success("Product deleted");
        router.push(`/${storeId}/products`);
        router.refresh();
      },
      onError(e) {
        toast.error("Something went wrong");
        console.log(`Error in updateProduct`, e);
      },
    });
  const onSubmit = async (data: productFormValues) => {
    if (initialValues) {
      await updateTrigger(data);
    } else {
      await createTrigger(data);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
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
              {initialValues ? `Edit product` : `Create product`}
            </h1>
            <p className="text-sm">Manage Product Preferences</p>
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
            <div className="grid grid-cols-3 gap-5">
              <ProductName form={form} />
              <Brands brands={brands} form={form} />
              <Price form={form} />
              <Colors colors={colors} form={form} />
              <Quantity form={form} />
            </div>
            <Button
              type="submit"
              className="w-32 cursor-pointer mt-5 flex gap-2"
              disabled={isMutatingCreate || isMutatingUpdate}
            >
              {initialValues ? "Save Changes" : "Create"}
              {isMutatingCreate || (isMutatingUpdate && <Loader />)}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductForm;

{
  /* <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField> */
}

{
  /* isfeatured */
}
{
  /* <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-4"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormLabel>isFeatured</FormLabel>
                    <FormDescription>
                      Items checked will be shown on the home page
                    </FormDescription>
                  </FormItem>
                )}
              ></FormField> */
}

{
  /* description */
}
{
  /* inside field object
                            {name: 'description', value: Array(0), onChange: ƒ, onBlur: ƒ, ref: ƒ} */
}
{
  /* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-60"
                        placeholder="Add points"
                        // onChange={ (e) => setPoint(e.target.value)  }
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField> */
}
{
  /* <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="border p-3 h-fit">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-4"
                      />
                    </FormControl>
                    <FormLabel>isArchived</FormLabel>
                    <FormDescription>
                      Items checked will not be show in the store
                    </FormDescription>
                  </FormItem>
                )}
              ></FormField> */
}

{
  /* <FormField
                control={form.control}
                name="ratings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Ratings</FormLabel>
                    <FormControl>
                      <Input placeholder="Ratings" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField> */
}

{
  /* <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (currImg) => currImg.url !== url
                            ),
                          ])
                        }
                        disabled={loading}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        value={field?.value?.map((image) => image.url)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField> */
}
