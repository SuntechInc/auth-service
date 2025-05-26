import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { User } from "../../entities/user.entity";
import { UserStatus as DomainUserStatus } from "../../enums/user-status.enum";
import { UserStatus as PrismaUserStatus } from "@prisma/client";

@Injectable()
export class UserPrismaRepository extends UserRepository {
    constructor(
        private readonly prisma: PrismaService
    ){
        super();
    }

    private mapStatus(status: PrismaUserStatus): DomainUserStatus{
        switch(status){
            case PrismaUserStatus.ACTIVE:
                return DomainUserStatus.ACTIVE
            case PrismaUserStatus.INACTIVE:
                return DomainUserStatus.INACTIVE
            case PrismaUserStatus.BLOCKED:
                return DomainUserStatus.BLOCKED
            case PrismaUserStatus.DELETED:
                return DomainUserStatus.DELETED
        }
    }

    async create(user: User): Promise<User> {
        const userCreated = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                idCompany: user.idCompany,
                status: user.status
            }
        })
        return {
            ...userCreated,
            status: this.mapStatus(userCreated.status)
        }
    }
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    softdelete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}