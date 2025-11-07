import { z } from 'zod';

// Base schema (for login)
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      {
        message:
          'Password to contain: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
      }
    ),
});

// Registration schema (extends base schema with name field)
export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .refine((val) => val.match(/^[A-Z]/), {
      message: 'First letter of name must be uppercase',
    }),
});

export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;