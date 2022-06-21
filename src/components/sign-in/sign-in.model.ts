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
    firstName: string,
    lastName: string,
    email: string,
    birth: string | Date,
    authId: string,
    photo?: string
}

export interface UserResponse {
    [key: string]: User
}