import * as z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]{8,}$/;

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email must be required",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password must be required",
  }),
  code: z.optional(
    z.string().min(6, {
      message: "Two Factor code must be at least 6 characters",
    })
  ),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  })
  .regex(passwordRegex),
  name: z.string().min(2, {
    message: "Name must be required",
  }),
});