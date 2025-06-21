import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/users/create-user.use-case';
import { GetUserUseCase } from '../../../application/users/get-user.use-case';
import { CreateUserBodySchema, CreateUserDto } from './dtos/create-user.dto';
import { userToDto } from './user.presenter';
import { ZodValidationPipe } from '../../../shared/zod-validation.pipe';
import { JwtAuthGuard } from '../../../application/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateUserBodySchema)) dto: CreateUserDto,
  ) {

    const result = await this.createUser.execute(dto);
    if (!result.ok) {
      return { message: (result as { ok: false; error: string }).error };
    }
    return userToDto(result.value);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const result = await this.getUser.execute(id);
    if (!result.ok) {
      return { message: (result as { ok: false; error: string }).error };
    }
    return userToDto(result.value);
  }
}
