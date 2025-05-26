
import { UserStatus } from "../enums/user-status.enum";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    idCompany: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        name: string;
        email: string;
        password: string;
        idCompany: string;
        status: UserStatus;
    }) {
        Object.assign(this, props);
    }
}