import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto): Promise<User> {
        const SALT_ROUNDS = 10 
        const hashedPassword = await bcrypt.hash(createUserDto.password, SALT_ROUNDS)

       const user = new User({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        idCompany: createUserDto.idCompany,
        status: createUserDto.status
       })
       const userCreated = await this.userRepository.create(user)
       return userCreated
    }
    findOne(id: string): any {
        throw new Error("Method not implemented.");
    }
    findAll(): User[] | PromiseLike<User[]> {
        throw new Error("Method not implemented.");
    }
    constructor(
        private readonly userRepository: UserRepository
    ){}
}
