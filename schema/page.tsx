import { z } from "zod"

const ContactNumber = z
  .string()
  .refine((value) => !value || /^\d{10}$/.test(value), {
    message: 'Contact number must be 10 digits if provided',
  });


export const formSchema =z.object({
  firstName: z.string().min(1).max(50, { message: 'First name must be between 1 and 50 characters' }),
  lastName: z.string().min(0).max(50, { message: 'Last name must be less than 50 characters' }),
  gender: z.enum(['male', 'female', 'other', 'unknown']),
  dateOfBirth: z.string(),
  contactNumber: ContactNumber.optional(),
});