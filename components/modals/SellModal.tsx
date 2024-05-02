("");
import React, { FC } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { ProductColumn } from "../ui/ProductColumn";
import { useParams, useRouter } from "next/navigation";

interface IsellModalProps {
  product: ProductColumn;
  isOpen: boolean;
  onClose: () => void;
  availableQuanity: number;
}
interface Iarg {
  quantity: number;
  productId:string,
  storeId:string
}
async function sellProduct(url: string, { arg }: { arg: Iarg }) {
  return await axios.patch(url, arg);
}


const SellModal: FC<IsellModalProps> = ({
  product,
  onClose,
  isOpen,
  availableQuanity,
}) => {

  const formSchema = z.object({
    quantity: z
      .coerce.number({
        required_error:"Quantity is required",
        invalid_type_error:"Only numbers allowed"
      })
      .min(1, {
        message: "Quantity cant be 0",

      })
      .max(availableQuanity, {
        message: `Quantity exceeds the availble quantities`,
      }),
  });
  const { storeId } = useParams();
  const router = useRouter()
  type schema = z.infer<typeof formSchema>;
  const form = useForm<schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  const { trigger, isMutating } = useSWRMutation(
    `/api/${storeId}/product/${product.id}/sell-product`,
    sellProduct
  );
  const onSubmit = async (data: schema) => {
    await trigger({ quantity: data.quantity,productId:product.id,storeId:storeId.toString() });
    onClose();
    router.refresh();
  };
  return (
    <>
      <Modal
        description="This action cant be undone"
        isOpen={isOpen}
        onClose={onClose}
        title="Enter the quantity to sell"
      >
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                defaultValue={1}
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <footer className="flex gap-5">
                <Button
                  type="submit"
                  disabled={isMutating}
                  variant="destructive"
                >
                  Continue
                </Button>
                <Button type="button" disabled={isMutating} onClick={onClose}>
                  Cancel
                </Button>
              </footer>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SellModal;
