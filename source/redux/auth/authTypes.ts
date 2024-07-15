export type Role = "ROLE_ADMIN" | "ROLE_EMPLOYEE";

export type RoleData = {
    roleId: number
    roleName: Role
}
export type ReduxStatus = "loading" | "succeeded" | "failed" | "sleeping";

export type User = {
    accessToken: string
    refreshToken: string
    roles: Array<Role>
    employeeId: string
    name: string
} | null;

export type LoginData = {
    username: string
    password: string
}

export type RegistrationData = LoginData & {
    name: string
    roleId: number
}

export interface RegistrationAnswer {
    name: string,
    roles: Array<Role>
}

