"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { createWorksapceSchema } from "@/features/workspaces/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorksapceSchema>>({
    resolver: zodResolver(createWorksapceSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = (values: z.infer<typeof createWorksapceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          window.location.href = `/workspaces/${data.$id}`;
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="gap-y-4">
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <div className="flex-col gap-y-2 hidden">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : typeof field.value === "string" &&
                                  field.value !== ""
                                ? field.value
                                : "/fallback.png"
                            }
                            alt=""
                            fill
                            className="object-cover"
                            onLoad={() => {
                              if (field.value instanceof File) {
                                URL.revokeObjectURL(
                                  field.value as unknown as string
                                );
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px] relative group flex items-center justify-center">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-slate-400" />
                            {!field.value && (
                              <button
                                className="absolute lg:opacity-0 lg:group-hover:opacity-100 opacity-100 hover:group-hover:bg-black/5 lg:text-white text-black lg:backdrop-blur w-full h-full flex items-center justify-center transition-opacity"
                                type="button"
                                onClick={() => inputRef.current?.click()}
                              >
                                <Plus className="size-6" />
                              </button>
                            )}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-base">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG. max 8MB
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.png,.svg,.jpeg"
                          onChange={handleImageChange}
                          ref={inputRef}
                          disabled={isSubmitting || isPending}
                        />
                        {field.value && (
                          <Button
                            variant="teritary"
                            size="sm"
                            className="w-fit mt-2"
                            type="button"
                            disabled={isSubmitting || isPending}
                            onClick={() => inputRef.current?.click()}
                          >
                            Change Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full lg:flex hidden",
                    !onCancel && "invisible"
                  )}
                  onClick={onCancel}
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? (
                    <div className="flex items-center">
                      <div className="loader"></div>
                      <p className="text-white">Loading</p>
                    </div>
                  ) : (
                    <>Cancel</>
                  )}
                </Button>
                <Button
                  className="w-full flex items-center"
                  type="submit"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? (
                    <div className="flex items-center">
                      <div className="loader"></div>
                      <p className="text-white">Loading</p>
                    </div>
                  ) : (
                    <>
                      <p>Create</p>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
