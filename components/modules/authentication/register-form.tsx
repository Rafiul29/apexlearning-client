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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SocialGoogle from "./social-google";
import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/types";

// Added role to schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required!").max(40),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8, "Minimum length is 8").max(20),
  role: z.enum([UserRole.STUDENT, UserRole.TUTOR]),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.STUDENT as UserRole,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          role: value.role,
        } as any);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success(`Verification email sent to ${data?.user.email}`, {
          id: toastId,
          description:
            "Please check your inbox (and spam folder) to activate your account.",
        });

      } catch (err) {
        toast.error("Something went wrong.", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-[24px] border border-slate-200/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] bg-white dark:bg-white/[0.02] backdrop-blur-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Select your role and enter your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-5">
              <form.Field
                name="role"
                children={(field) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-slate-700 dark:text-slate-300 font-medium">I want to join as a...</FieldLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.state.value === UserRole.STUDENT
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "border rounded-xl h-12 transition-all font-medium",
                          field.state.value === UserRole.STUDENT
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            : "border-slate-200 dark:border-white/10 hover:border-emerald-500/30 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5"
                        )}
                        onClick={() => field.handleChange(UserRole.STUDENT)}
                      >
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.state.value === UserRole.TUTOR
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "border rounded-xl h-12 transition-all font-medium",
                          field.state.value === UserRole.TUTOR
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            : "border-slate-200 dark:border-white/10 hover:border-emerald-500/30 text-slate-600 dark:text-slate-400 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5"
                        )}
                        onClick={() => field.handleChange(UserRole.TUTOR)}
                      >
                        Tutor
                      </Button>
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Name Field */}
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium">Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      placeholder="John Doe"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="rounded-xl h-12 bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 shadow-sm"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium">Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      placeholder="m@example.com"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="rounded-xl h-12 bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 shadow-sm"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => (
                  field.state.value,
                  (
                    <Field>
                      <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium">Password</FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        placeholder="********"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="rounded-xl h-12 bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 shadow-sm"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )
                )}
              />

              <Field className="pt-2">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 font-bold shadow-sm transition-all"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? <Spinner className="mr-2" /> : null}
                      {isSubmitting ? "Creating..." : "Create Account"}
                    </Button>
                  )}
                />

                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div> */}

                {/* <SocialGoogle title="Sign Up with Google" /> */}

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                    Login
                  </Link>
                </p>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
