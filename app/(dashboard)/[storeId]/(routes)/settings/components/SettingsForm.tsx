"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import { useUser } from "@clerk/nextjs";
import { settingsSchema } from "@/lib/formSchemas";
import useSWRMutation from "swr/mutation";

interface IsettingsFormProps {
  initialValues: Store | null;
}
type SettingFormValues = z.infer<typeof settingsSchema>;

async function updateStore(url: string, { arg }: { arg: SettingFormValues }) {
  return await axios.patch(url, arg);
}
async function deleteStore(url: string) {
  return await axios.delete(url);
}

const SettingsForm: React.FC<IsettingsFormProps> = ({ initialValues }) => {
  const { storeId } = useParams();
  const {
    trigger,
    isMutating: isUpdating,
    error: updateStoreError,
  } = useSWRMutation(`/api/stores/${storeId}`, updateStore, {
    onSuccess() {
      toast.success("Store updated");
      router.refresh();
    },
  });
  const {
    isMutating: isDeleting,
    trigger: triggerDelete,
    error: deleteStoreError,
  } = useSWRMutation(`/api/stores/${storeId}`, deleteStore, {
    onSuccess() {
      toast.success("Store Deleted");
      router.refresh();
    },
    onError(err) {
      if (err.response.data.code === "P2014") {
        toast.error(
          "Delete all Products,Billboards, and Categories associated with this store to continue"
        );
      } else {
        toast.error("Something went wrong");
        console.log(err.response.data);
      }
    },
  });
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues || {},
  });
  const handleSubmit = async (data: SettingFormValues) => trigger(data);

  return (
    <>
      <AlertModal
        loading={isDeleting}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={triggerDelete}
      />
      <main className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm">Manage Store Preferences</p>
          </section>
          <Button
            onClick={() => setOpenDeleteAlert(true)}
            disabled={isUpdating || isDeleting}
            variant="destructive"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </header>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isUpdating || isDeleting}
                        placeholder="store name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <Button
                type="submit"
                className="cursor-pointer w-32"
                disabled={isUpdating || isDeleting}
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default SettingsForm;
