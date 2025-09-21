// //only USER 
//schema/userSignUpschema.ts
import * as z from "zod";
export const userSignUpschema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

export type SignUpFormData = z.infer<typeof userSignUpschema>;




// //schema/userSignUpschema.ts
// import * as z from "zod";

// export const userSignUpschema = z.object({
//   username: z
//     .string()
//     .min(4, { message: "Username must be at least 4 characters" })
//     .max(64, { message: "Username must be at most 64 characters" }),
//   email: z
//     .string()
//     .min(1, { message: "Email is required" })
//     .email({ message: "Please enter a valid email address" }),
//   password: z
//     .string()
//     .min(1, { message: "Password is required" })
//     .min(8, { message: "Password must be at least 8 characters" })
//     .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//     .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//     .regex(/[0-9]/, { message: "Password must contain at least one number" })
//     .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
// });

// export type SignUpFormData = z.infer<typeof userSignUpschema>;