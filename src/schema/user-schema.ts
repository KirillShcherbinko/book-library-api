import z from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './consts';

export const userSchema = z.object({
  email: z.email('Invalid email').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(MIN_PASSWORD_LENGTH, `Password must be longer than ${MIN_PASSWORD_LENGTH}`)
    .max(MAX_PASSWORD_LENGTH, `Password must be shorter than ${MAX_PASSWORD_LENGTH}`),
});
