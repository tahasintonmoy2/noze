import * as z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be 2 or more characters",
    })
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
