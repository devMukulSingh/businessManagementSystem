"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/commons/Loader";
import { colorSchema } from "@/lib/formSchemas";
import ColorName from "../../../colors/[colorId]/components/ColorName";
import ColorValue from "../../../colors/[colorId]/components/ColorValue";
import useSWRMutation from "swr/mutation";
interface IcolorFormDialogProps {
  onClose: () => void;
}
interface Iarg {
  name: string;
  value: string;
}
async function sendRequest(url: string, { arg }: { arg: Iarg }) {
  await axios.post(url, arg);
}
type colorFormValues = z.infer<typeof colorSchema>;

const ColorFormDialog: React.FC<IcolorFormDialogProps> = ({ onClose }) => {
  const { storeId } = useParams();
  const { isMutating, error, trigger } = useSWRMutation(
    `/api/${storeId}/color`,
    sendRequest,
  );
  const router = useRouter();
  const form = useForm<colorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });
  const onSubmit = async (data: colorFormValues) => {
    try {
      await trigger(data);
      onClose();
      toast.success("color created");
      router.refresh();
    } catch (error: any) {
      // if(error.response.data.code==="P2002") toast.error()
      toast.error("Something went wrong");
      console.log(`Error in onSubmit`, error);
    }
  };
  if (error) console.log("Error in color POST req ", error);

  return (
    <>
      <div className="flex flex-col gap-6 px-10 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <ColorName form={form} loading={isMutating} />
              <ColorValue form={form} loading={isMutating} />
              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={isMutating}
              >
                Create
                {isMutating && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ColorFormDialog;
