import { Role } from "../enums/Role";

export interface EmployeeRegisterDTO {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: Role;
}