"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SocialGoogle from "./social-google";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UserStatus } from "@/types";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required!")
    .max(254)
    .refine((value) => value === value.toLowerCase(), {
      message: "Email must be in lowercase!",
    }),
  password: z.string().min(8, "Minimum length is 8").max(20),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl") as string | null;
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        console.log("data from loging form", data);


        const user = data?.user as any;
        const userRole = user?.role;

        router.refresh();

        if (redirectUrl) {
          router.replace(redirectUrl);
        } else {
          if (userRole === "ADMIN") {
            router.replace("/admin");
          } else if (userRole === "TUTOR") {
            router.replace("/tutor/dashboard");
          } else {
            router.replace("/dashboard");
          }
        }
        toast.success("Account Login Successfully!", { id: toastId });
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  useEffect(() => {
    const status = searchParams.get("status") as UserStatus | null;
    if (!status) return;

    const statusMessages: Record<
      string,
      { title: string; description: string }
    > = {
      [UserStatus.INACTIVE]: {
        title: "Account Inactive",
        description:
          "Your account is not yet active. Please check your email or contact support.",
      },
      [UserStatus.SUSPENDED]: {
        title: "Account Suspended",
        description:
          "Your account is temporarily suspended for a policy violation.",
      },
      [UserStatus.BAN]: {
        title: "Banned",
        description:
          "This account has been permanently banned from the platform.",
      },
    };

    const message = statusMessages[status];

    if (message) {
      const timer = setTimeout(() => {
        toast.error(message.title, {
          description: message.description,
          duration: 6000,
        });
      }, 100);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-[24px] border border-slate-200/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] bg-white dark:bg-white/[0.02] backdrop-blur-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-5">
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium">Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="m@example.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="rounded-xl h-12 bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 shadow-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium">Password</FieldLabel>
                        {/* <Link
                          href="forget-password"
                          className="ml-auto inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                        >
                          Forgot your password?
                        </Link> */}
                      </div>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="********"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="rounded-xl h-12 bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 shadow-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <Field className="pt-2">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="w-full rounded-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 font-bold shadow-sm transition-all"
                    >
                      {isSubmitting && <Spinner className="mr-2" />}
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  )}
                />
                {/* <SocialGoogle title="Sigin In with Google" /> */}
                <FieldDescription className="text-center mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>



      <>

      </>
    </div>
  );
}

