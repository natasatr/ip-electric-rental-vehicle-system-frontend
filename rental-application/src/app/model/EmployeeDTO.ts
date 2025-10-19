import { Role } from "../enums/Role";

export interface EmployeeDTO {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    [key: string]: any;
}