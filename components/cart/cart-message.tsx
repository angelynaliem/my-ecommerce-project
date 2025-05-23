"use client";

import { useCartStore } from "@/lib/client-store";
import { check } from "drizzle-orm/pg-core";
import { motion } from "framer-motion";
import { DrawerTitle, DrawerDescription } from "../ui/drawer";
import { ArrowLeft } from "lucide-react";

export default function CartMessage() {
  const { checkoutProgress, setCheckoutProgress } = useCartStore();
  return (
    <motion.div
      className="text-center"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 10 }}
    >
      <DrawerTitle>
        {checkoutProgress === "cart-page" ? "Your cart items" : null}
        {checkoutProgress === "payment-page" ? "Choose a payment method" : null}
        {checkoutProgress === "confirmation-page" ? "Order confirmed" : null}
      </DrawerTitle>
      <DrawerDescription className="py-1">
        {checkoutProgress === "cart-page" ? "View and edit your bag" : null}
        {checkoutProgress === "payment-page" ? (
          <span
            onClick={() => setCheckoutProgress("cart-page")}
            className="flex items-center justify-center gap-1 cursor-pointer hover:text-primary"
          >
            {" "}
            Head back to cart <ArrowLeft size={14} />
          </span>
        ) : null}
        {checkoutProgress === "confirmation-page"
          ? "You will receive an email with your receipt."
          : null}
      </DrawerDescription>
    </motion.div>
  );
}
