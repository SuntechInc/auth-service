import { z } from 'zod';

export const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof LoginBodySchema>;

export const LogoutBodySchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().uuid(),
});

export type LogoutDto = z.infer<typeof LogoutBodySchema>;

export const SwitchCompanyBodySchema = z.object({
  companyId: z.string().uuid(),
  accessToken: z.string().min(1),
});

export type SwitchCompanyDto = z.infer<typeof SwitchCompanyBodySchema>; 