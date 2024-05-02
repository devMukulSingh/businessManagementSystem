"use client";
import * as z from "zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Modal } from "@/components/ui/modal";
import { setDialog } from "@/store/slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Store name is required",
  }),
});

export const StoreModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const isOpen = useAppSelector((state) => state.adminSlice.isOpen);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/stores`, values);
      dispatch(setDialog(false));
      router.refresh();
    } catch (error) {
      console.log(`Error in onSubmit handler ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store"
      isOpen={isOpen}
      onClose={() => {
        dispatch(setDialog(false));
      }}
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <footer
              className="
                            flex 
                            gap-4
                            mt-5
                        "
            >
              <Button className="flex gap-3" disabled={loading} type="submit">
                Continue
                {loading && <Loader2 className="flex gap-3 animate-spin" />}
              </Button>
              <Button
                disabled={loading}
                onClick={() => dispatch(setDialog(false))}
                variant="outline"
              >
                Cancel
              </Button>
            </footer>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
