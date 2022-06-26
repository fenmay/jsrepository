import { User } from "../../components/sign-in/sign-in.model";

export const setToken = (token: string): void => localStorage.setItem('accessToken', token);

export const getToken = (): string => localStorage.getItem('accessToken');

export const setUserLocal = (user: User): void => localStorage.setItem('user', JSON.stringify(user));

export const getUserLocal = (): User => JSON.parse(localStorage.getItem('user')) || {};

export const clearLocalStorage = (): void => localStorage.clear();

export const setCurrentUserData = (data: User): void => localStorage.setItem('currentUserData', JSON.stringify(data));

export const getCurrentUserData = (): User => JSON.parse(localStorage.getItem('currentUserData'));