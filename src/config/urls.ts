import { registerAs } from '@nestjs/config';

export default registerAs('urls', () => ({
  coreService: process.env.CORE_SERVICE_URL,
  authService: process.env.AUTH_SERVICE_URL,
  // adicione outras URLs aqui
}));