export interface Enviroment {
    production: boolean,
    fbApiKey: string,
}

export type Court = string | number
export interface User {
    userId?: string,
    firstName: string,
    lastName: string,
    price?: number,
    note?: string
}

export interface Reservation {
    reservationId?: string,
    year: string,
    month: string,
    day: string,
    court: Court,
    timeStart: string,
    timeEnd: string,
    rowStart: number,
    duration: number,
    rowEnd: number,
    user: User,
    isActive?: boolean
}

export interface Hours {
    hour: string,
    rowStart: number
}

export interface LoginUser {
    email: string,
    password: string,
    returnSecureToken: boolean
}

export interface FbSigInResponse {
    idToken: string,
    email: string,
    expiresIn: string
}