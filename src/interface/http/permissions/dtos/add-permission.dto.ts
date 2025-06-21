import { z } from 'zod';

export const AddPermissionBodySchema = z.object({
  permission: z.string().min(1),
});

export type AddPermissionDto = z.infer<typeof AddPermissionBodySchema>;
