"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Star, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { reviewSchema } from "@/types/reviews-schema";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import { addReview } from "@/server/actions/add-review";
import { toast } from "sonner";

export default function ReviewsForm() {
  const params = useSearchParams();
  const productID = Number(params.get("productID"));

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      productID,
    },
  });

  const { execute, status } = useAction(addReview, {
    onSuccess({ error, success }) {
      if (error) {
        toast.error(error);
      }
      if (success) {
        toast.success("Review added");
        form.reset();
      }
    },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log("adding the review");
    execute({
      comment: values.comment,
      rating: values.rating,
      productID,
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button className="font-medium w-full" variant={"secondary"}>
            Leave a review
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your review</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="How would you describe this product?"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your rating</FormLabel>
                  <FormControl>
                    <Input
                      type="hidden"
                      placeholder="Star Rating"
                      {...field}
                    ></Input>
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <motion.div
                          className="relative cursor-pointer"
                          whileTap={{ scale: 0.8 }}
                          whileHover={{ scale: 1.2 }}
                          key={value}
                        >
                          <Star
                            key={value}
                            onClick={() => {
                              form.setValue("rating", value, {
                                shouldValidate: true,
                              });
                            }}
                            className={cn(
                              "text-primary bg-transparent transition-all duration-300 ease-in-out",
                              form.getValues("rating") >= value
                                ? "fill-primary"
                                : "fill-muted"
                            )}
                          ></Star>
                        </motion.div>
                      );
                    })}
                  </div>
                </FormItem>
              )}
            ></FormField>
            <Button
              disabled={status === "executing"}
              className="w-full"
              type="submit"
            >
              {status === "executing" ? "Adding review..." : "Add review"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
