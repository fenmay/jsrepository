import { UserResponse } from "../components/sign-in/sign-in.model"

export const responseMapper = (collection: UserResponse, dynamicKey: string) => Object.keys(collection)
    .map(key => ({ ...collection[key], [dynamicKey]: key }))