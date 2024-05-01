import { UserButton, auth } from "@clerk/nextjs";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Separator } from "../ui/separator";
import NavLinks from "./NavLinks";
import Menu from "./Menu";
import { ThemeToggler } from "./ThemeToggler";

const Navbar = async ({ storeId }: { storeId: string }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const store = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <main
        className="
            h-24
            flex
            px-5
            gap-5
            justify-between
            items-center
            "
      >
        <Menu />

        <StoreSwitcher items={store} />

        <NavLinks />
        <div className="flex gap-5">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
        </div>
      </main>
      <Separator />
    </>
  );
};

export default Navbar;
