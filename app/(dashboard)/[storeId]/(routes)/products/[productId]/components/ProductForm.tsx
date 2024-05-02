"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Brand, Color, Product } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/commons/Loader";
import { productSchema } from "@/lib/formSchemas";
export interface IinitialValues {
  name: string | undefined;
  price: number | undefined;
  quantity: number;
  colorId: string | undefined;
  // sizeId: string | undefined;
  // categoryId: string | undefined;
  // archived: boolean | undefined;
  // featured: boolean | undefined;
  // description: string | undefined;
  // ratings: number | undefined;
  // images: Image[] | undefined;
}
interface IproductFormProps {
  initialValues: IinitialValues;
  colors: Color[];
  brands: Brand[];
  // categories: Category[];
  // sizes: Size[];
}

type productFormValues = z.infer<typeof productSchema>;

const ProductForm: React.FC<IproductFormProps> = ({
  initialValues,
  colors,
  brands,
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, productId } = params;
  const [loading, setLoading] = useState(false);
  const isInitalValues = Object.keys(initialValues).length > 0;

  const form = useForm<productFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: isInitalValues
      ? {
          ...initialValues,
        }
      : {
          name: "",
          price: 0,
          quantity: 0,
          colorId: "",
          brandId: "",
        },
  });
  const onSubmit = async (data: productFormValues) => {
    try {
      setLoading(true);
      if (isInitalValues) {
        await axios.patch(`/api/${storeId}/product/${productId}`, data);
        toast.success("product updated");
        router.push(`/${storeId}/products`);
      } else {
        await axios.post(`/api/${storeId}/product`, data);
        toast.success("product created");
        router.push(`/${storeId}/products`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleProductDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/product/${productId}`);
      setOpenDeleteAlert(false);
      toast.success("Product deleted");
      router.push(`/${storeId}/products`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleProductDelete ${e}`);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={handleProductDelete}
      />
      <div className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">
              {isInitalValues ? `Edit product` : `Create product`}
            </h1>
            <p className="text-sm">Manage Product Preferences</p>
          </section>
          <Button
            className={`${Object.keys(initialValues).length === 0 ? "hidden" : ""}`}
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
            <div className="grid grid-cols-3 gap-5">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>product name</FormLabel>
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

              {/* price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="price"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* quantity */}
              <FormField
                defaultValue={1}
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="quantity"
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
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="SelectColor" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem value={color.id} key={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              ></FormField>
              {/* Brand */}
              <FormField
                name="brandId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <FormControl>
                          <SelectValue placeholder="Select brand" />
                        </FormControl>
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem value={brand.id} key={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* size */}
              {/* <FormField
                                control={form.control}
                                name="sizeId"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select
                                        onValueChange={field.onChange} 
                                        value={field.value}             
                                        disabled={loading}              
                                        defaultValue={field.value} 
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="SelectSize"/>
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            {
                                                sizes.map( (size) => (
                                                    <SelectItem
                                                        value={size.id}
                                                        key={size.id}
                                                    >
                                                        {size.name}
                                                    </SelectItem>
                                                ) )
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                )}
                            >
                            </FormField> */}
              {/* category */}
              {/* <FormField
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
              ></FormField> */}

              {/* isfeatured */}
              {/* <FormField
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
              ></FormField> */}

              {/* description */}
              {/* inside field object
                            {name: 'description', value: Array(0), onChange: ƒ, onBlur: ƒ, ref: ƒ} */}
              {/* <FormField
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
              ></FormField> */}

              {/* Archived */}
              {/* <FormField
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
              ></FormField> */}

              {/* <FormField
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
              ></FormField> */}

              {/* image */}
              {/* <FormField
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
              ></FormField> */}
            </div>

            <Button
              type="submit"
              className="w-32 cursor-pointer mt-5 flex gap-2"
              disabled={loading}
            >
              {isInitalValues ? "Save Changes" : "Create"}
              {loading && <Loader />}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductForm;
