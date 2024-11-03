import * as z from "zod";

export const createWorksapceSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const updateWorksapceSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be 2 or more characters",
  }).optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email must be required",
  }),
});
