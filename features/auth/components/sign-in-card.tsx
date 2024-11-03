"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

import { useSignIn } from "@/features/auth/api/use-signin";
import { signUpWithGoogle } from "@/lib/oauth";

const SignInCard = () => {
  const [isShow, setIsShow] = useState(false);
  const { mutate, isPending } = useSignIn();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Welcome back, Sign In
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={cn(
                          "w-full my-2",
                          errors.email &&
                            "focus-visible:ring-red-600 border-red-600 focus-visible:border-input"
                        )}
                        placeholder="m@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-medium text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <>
                        <div className="flex items-center relative">
                          <Input
                            disabled={isSubmitting}
                            className={cn(
                              "w-full my-2",
                              errors.password &&
                                "focus-visible:ring-red-600 border-red-600 focus-visible:border-input"
                            )}
                            placeholder="Enter your password"
                            type={isShow ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground absolute right-2 cursor-pointer hover:bg-transparent hover:text-black/75 transition"
                            onClick={() => setIsShow(!isShow)}
                          >
                            {isShow ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </>
                    </FormControl>
                    <FormMessage className="font-medium text-red-600" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isPending}
              >
                {isSubmitting || isPending ? (
                  <div className="flex items-center">
                    <div className="loader"></div>
                    <p className="text-white">Loading</p>
                  </div>
                ) : (
                  <>
                    <p>Lgoin</p>
                  </>
                )}
              </Button>
              <Button
                onClick={() => signUpWithGoogle()}
                variant="outline"
                className="w-full flex items-center"
                disabled={isSubmitting || isPending}
                type="button"
              >
                {isSubmitting || isPending ? (
                  <div className="flex items-center">
                    <div className="loader"></div>
                    <p className="text-white">Loading</p>
                  </div>
                ) : (
                  <>
                    <FcGoogle className="mr-2 size-5" />
                    Sign up with Google
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/auth/sign-up" className="hover:underline text-primary">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
