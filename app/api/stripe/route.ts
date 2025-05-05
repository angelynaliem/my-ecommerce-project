import { db } from "@/server";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2024-11-20.acacia",
  });

  const sig = req.headers.get("stripe-signature") || "";
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  const reqText = await req.text();
  const reqBuffer = Buffer.from(reqText);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  console.log("Event received:", event);

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      try {
        const updatedOrder = await db
          .update(orders)
          .set({
            status: "succeeded",
            receiptURL: event.data.object.charges?.data[0]?.receipt_url || "",
          })
          .where(eq(orders.paymentIntentID, paymentIntent.id))
          .returning();

        console.log("Order updated:", updatedOrder);
      } catch (dbError) {
        console.error("Database Error:", dbError);
        return new NextResponse("Database Error", { status: 500 });
      }

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response("ok", { status: 200 });
}
