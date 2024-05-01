"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import { ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { setDialog } from "@/store/slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps {
  items: Store[];
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({ items }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const formattedItems = items.map((item: Store) => ({
    label: item.name,
    id: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.id === params.storeId,
  );

  const onStoreSelect = (store: { label: string; id: string }) => {
    setOpen(false);
    router.push(`/${store.id}`);
  };

  return (
    <main>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className="w-52 justify-between "
            onClick={() => setOpen((prev) => !prev)}
          >
            <StoreIcon className="mr-2" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search Store..." />
            <CommandList>
              <CommandEmpty>No Store found</CommandEmpty>
              <CommandGroup>
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => onStoreSelect(store)}
                  >
                    {store.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  dispatch(setDialog(true));
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-3" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </main>
  );
};

export default StoreSwitcher;
