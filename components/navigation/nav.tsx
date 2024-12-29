import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "@/components/navigation/logo";
import CartDrawer from "../cart/cart-drawer";

export default async function Nav() {
  const session = await auth();
  // console.log(session);

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between items-center md:gap-8 gap-4">
          <li className="flex flex-1">
            <Link href="/" aria-label="my e-commerce project logo">
              <Logo></Logo>
            </Link>
          </li>
          <li className="relative flex items-center hover:bg-muted">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton
                expires={session?.expires}
                user={session?.user}
              ></UserButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
