export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    photo: string
    exp: number
}

export interface IUserState {
    user: IUser | null
    token: string | null
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: File | null
}