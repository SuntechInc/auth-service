import pino from 'pino';
import { Provider } from '@nestjs/common';

export const PinoProvider: Provider = {
  provide: 'Logger',
  useFactory: () => pino({ level: 'info' }),
};
