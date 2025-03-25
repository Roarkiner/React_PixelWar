export type LoginRequestModel = {
    email: string;
    password: string;
}

export type RegisterRequestModel = {
    email: string;
    username: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
}