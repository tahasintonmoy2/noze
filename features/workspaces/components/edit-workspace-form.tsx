"use client";

import { DeleteWorkspaceModal } from "@/components/models/delete-workspace-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useResetInviteCode } from "@/features/workspaces/api/use-reset-invite-code";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { updateWorksapceSchema } from "@/features/workspaces/schemas";
import { WorkspaceType } from "@/features/workspaces/types";
import { useDeleteWSP } from "@/hooks/use-delete-workspace";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";

interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: WorkspaceType;
}

export const EditWorkspaceForm = ({
  onCancel,
  initialValues,
}: EditWorkspaceFormProps) => {
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResetingInviteCode } =
    useResetInviteCode();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDeleteWSP();
  const [isCopy, setIsCopy] = useState(false);

  const form = useForm<z.infer<typeof updateWorksapceSchema>>({
    resolver: zodResolver(updateWorksapceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url = origin;

  const baseUrl = `${url}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  const onCopy = (url: string) => {
    if (!baseUrl) return;

    navigator.clipboard.writeText(url);
    setIsCopy(true);

    toast.success("Invite url copied to clipboard");

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const Icon = isCopy ? Check : Copy;

  const onSubmit = (values: z.infer<typeof updateWorksapceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      {
        form: finalValues,
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: ({ data }) => {
          form.reset();
          window.location.href = `/workspaces/${data.$id}`;
        },
      }
    );
  };

  const onDelete = () => {
    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          onClose();
          window.location.href = "/";
        },
      }
    );
  };

  const onReset = () => {
    resetInviteCode(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.refresh();
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
    <>
      <DeleteWorkspaceModal
        open={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
        loading={isDeleting}
      />
      <div className="flex flex-col gap-y-4">
        <Card className="w-full h-full border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-4">
              <Button
                variant="secondary"
                onClick={
                  onCancel
                    ? onCancel
                    : () =>
                        (window.location.href = `/workspaces/${initialValues.$id}`)
                }
              >
                <MdArrowBack className="size-4 mr-2" />
                Back
              </Button>
              {initialValues.name}
            </CardTitle>
            <CardDescription>Edit your workspace details.</CardDescription>
          </CardHeader>
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
                          <p>Update</p>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="w-full h-full border shadow-none">
          <CardHeader>
            <CardTitle>Invite code</CardTitle>
            <CardDescription>
              Use this invite code to share your workspace with other members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-x-3">
              <Input value={baseUrl} readOnly />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!baseUrl || isCopy}
                onClick={() => onCopy(baseUrl)}
              >
                <Icon className="size-4" />
              </Button>
            </div>
            <Button
              className="mt-3 flex items-end justify-end ml-auto"
              onClick={onReset}
              disabled={isResetingInviteCode}
            >
              {isResetingInviteCode ? (
                <div className="flex items-center">
                  <div className="loader"></div>
                  <p className="text-white">Resting</p>
                </div>
              ) : (
                <>
                  <p className="text-white dark:text-primary-foreground">Reset invite code</p>
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full h-full border-red-800 bg-red-700/30">
          <CardHeader>
            <CardTitle className="text-red-800">Danger Zone</CardTitle>
            <CardDescription className="text-red-800">
              Deleting a workspace will permanently delete all its data and
              cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="bg-red-600"
              type="button"
              disabled={isDeleting}
              onClick={onOpen}
            >
              Delete Workspace
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
