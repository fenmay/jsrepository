export interface SignInUserData {
    email: string,
    password: string
}

export interface signInResponse {
    user: {
        accessToken: string,
        uid: string
    }
}

export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    birth: string | Date,
    authId: string,
    photo?: string,
    userId?: string
}

export interface UserResponse {
    [key: string]: User
}