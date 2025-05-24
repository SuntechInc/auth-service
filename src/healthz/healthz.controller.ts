
import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('healthz')
export class HealthController {
  @Get()
  health() {
    return { 
        service: 'auth-service',
        status: HttpStatus.OK, 
        timestamp: new Date().toISOString() };
  }
}
