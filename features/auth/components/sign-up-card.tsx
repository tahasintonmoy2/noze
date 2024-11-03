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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

import { useSignUp } from "@/features/auth/api/use-signup";
import { signUpWithGoogle } from "@/lib/oauth";

const SignUpCard = () => {
  const [isShow, setIsShow] = useState(false);
  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={cn(
                          "w-full my-2",
                          errors.name &&
                            "focus-visible:ring-red-600 border-red-600 focus-visible:border-input"
                        )}
                        placeholder="Suzy"
                        type="text"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-medium text-red-600" />
                  </FormItem>
                )}
              />
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
                          <button
                            type="button"
                            className="text-muted-foreground absolute right-2 cursor-pointer"
                            onClick={() => setIsShow(!isShow)}
                          >
                            {isShow ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </>
                    </FormControl>
                    {errors.password && (
                      <div className="text-red-600 ml-4">
                        <p className="text-base">Password must be:</p>
                        <ul className="font-extralight text-xs list-disc">
                          <li>Be at least 8 characters long</li>
                          <li>Contain at least one letter</li>
                          <li>Contain at least one number</li>
                          <li>
                            Contain at least one special character (@$!%*?&)
                          </li>
                        </ul>
                      </div>
                    )}
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
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
                    <p>Create an account</p>
                  </>
                )}
              </Button>
              <Button
                onClick={()=> signUpWithGoogle()}
                variant="outline"
                className="w-full flex items-center"
                type="button"
              >
                 <FcGoogle className="mr-2 size-5" />
                 Sign up with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/sign-in" className="hover:underline text-primary">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
