"use client";

import { AuthCard } from "./auth-card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginSchema } from "@/types/login-schema";
import * as z from "zod";
// import { emailSignIn } from "@/server/actions/email-signin";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { ResetSchema } from "@/types/reset-schema";
import { reset } from "@/server/actions/password-reset";

export default function ResetForm() {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(reset, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
      console.log(data);
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    execute(values);
    // console.log(values);
  };

  return (
    <AuthCard
      backButtonLabel="Back to login"
      cardTitle="Forgot your password?"
      backButtonHref="/auth/login"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder="carolinaharris@gmail.com"
                        disabled={status === "executing"}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormSuccess message={success}></FormSuccess>
              <FormError message={error}></FormError>

              <Button size={"sm"} variant={"link"} asChild>
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
