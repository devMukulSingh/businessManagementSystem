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
import { useUser } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
import { storeSchema } from "@/lib/formSchemas";
import toast from "react-hot-toast";
import type { UserResource } from "@clerk/types";

type TformFieldValues = z.infer<typeof storeSchema>;
interface Iarg {
  name: string;
  user: UserResource | null | undefined;
}
async function createStore(url: string, { arg }: { arg: Iarg }) {
  return axios.post(url, arg);
}
export const StoreModal = () => {
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.adminSlice.isOpen);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { trigger, isMutating } = useSWRMutation(`/api/stores`, createStore, {
    onSuccess(data) {
      dispatch(setDialog(false));
      router.push(`/${data.data.id}`)
    },
    onError(err) {
      toast.error(`Something went wrong`);
      console.log(`Error in onSubmit handler`, err);
    },
  });

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: TformFieldValues) =>  trigger({name: values.name, user,}) ;

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
                      disabled={isMutating}
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
              <Button className="flex gap-3" disabled={isMutating} type="submit">
                Continue
                {isMutating && <Loader2 className="flex gap-3 animate-spin" />}
              </Button>
              <Button
                disabled={isMutating}
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
