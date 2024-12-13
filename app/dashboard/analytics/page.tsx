import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { orderProduct, productVariants } from "@/server/schema";
import Sales from "./sales";
import { db } from "@/server";
import { desc } from "drizzle-orm";
import Earnings from "./earnings";

export const revalidate = 0;

export default async function Analytics() {
  const totalOrders = await db.query.orderProduct.findMany({
    orderBy: [desc(orderProduct.id)],
    limit: 10,
    with: {
      order: { with: { user: true } },
      product: true,
      productVariants: { with: { variantImages: true } },
    },
  });

  if (totalOrders.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No orders</CardTitle>
        </CardHeader>
      </Card>
    );

  if (totalOrders)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Analytics</CardTitle>
          <CardDescription>
            Check your sales, new customers and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Sales totalOrders={totalOrders} />
          <Earnings totalOrders={totalOrders} />
        </CardContent>
      </Card>
    );
}
