import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}