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
  role: z.enum([UserRole.STUDENT, UserRole.TUTOR], {
    required_error: "Please select a role",
  }),
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
        toast.success("Account Created Successfully!", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong.", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
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
            <FieldGroup>
              <form.Field
                name="role"
                children={(field) => (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel>I want to join as a...</FieldLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={
                          field.state.value === UserRole.STUDENT
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "border-2",
                          field.state.value === UserRole.STUDENT &&
                            "border-primary",
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
                          " border-2",
                          field.state.value === UserRole.TUTOR &&
                            "border-primary",
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
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      placeholder="John Doe"
                      onChange={(e) => field.handleChange(e.target.value)}
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
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      placeholder="m@example.com"
                      onChange={(e) => field.handleChange(e.target.value)}
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
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )
                )}
              />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full"
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

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
