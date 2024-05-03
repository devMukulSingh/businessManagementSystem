"use client";

import { useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { setDialog } from "@/store/slice";
import { StoreModal } from "@/components/modals/StoreModal";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <StoreModal />
        <div className="items-center border rounded-md shadow-neutral-500 shadow-md  pt-2 pb-5 px-10 h-[20rem] flex flex-col gap-1 min-w-[18rem]">
          <h1
            className="text-3xl 
            sm:text-4xl 
            font-semibold
            text-center
            "
          >
            nextBMS
          </h1>
          <h1 className="text-sm text-neutral-300">One BMS multiple stores</h1>
          <div className="flex flex-col gap-3 mt-10">
            <h1 className="text-xl sm:text-2xl">
              Welcome! <span className="font-bold">{user?.firstName}</span>
            </h1>
            <h1>Add a store to get Started!👇</h1>
          </div>
          <Button
            className="mt-auto w-full "
            onClick={() => dispatch(setDialog(true))}
          >
            Add Store
          </Button>
        </div>
      </div>
    </>
  );
}
