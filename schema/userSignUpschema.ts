// //only USER 
// //schema/userSignUpschema.ts

// import * as z from "zod";

// export const signUpSchema = z
//   .object({
//     email: z
//       .string()
//       .min(1, { message: "Email is required" })
//       .email({ message: "Please enter a valid email address" }),
//     password: z
//       .string()
//       .min(1, { message: "Password is required" })
//       .min(8, { message: "Password must be at least 8 characters" })
//       .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//       .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//       .regex(/[0-9]/, { message: "Password must contain at least one number" })
//       .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
// //     passwordConfirmation: z
// //       .string()
// //       .min(1, { message: "Please confirm your password" }),
// //   })
// //   .refine((data) => data.password === data.passwordConfirmation, {
// //     message: "Passwords do not match",
// //     path: ["passwordConfirmation"],
//   });




//schema/userSignUpschema.ts
import * as z from "zod";

export const userSignUpschema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

export type SignUpFormData = z.infer<typeof userSignUpschema>;