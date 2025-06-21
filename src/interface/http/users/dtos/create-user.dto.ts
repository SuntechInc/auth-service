import { z } from 'zod';

export const CreateUserBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserBodySchema>;
