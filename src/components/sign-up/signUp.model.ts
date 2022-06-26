export interface SignUpUserData {
    firstName: string;
    lastName: string;
    birth: string | Date;
    email: string;
    password_1: string;
    password_2: string;
    authId?: string;
}