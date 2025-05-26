import { UserStatus } from "../enums/user-status.enum";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    idCompany: string;
    status: UserStatus;
}
