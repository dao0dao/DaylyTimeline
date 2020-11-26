export interface Enviroment {
    production: boolean,
    fbApiKey: string,
    dbUrl: string
}

export type Court = string | number
export interface User {
    userId?: string,
    firstName: string,
    lastName: string,
    price?: number,
    telephone?: number,
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
    duration?: number,
    rowStart?: number,
    rowEnd?: number,
    top?: number,
    left?: number,
    zIndex?: number,
    user: User,
    isActive?: boolean
}

export interface Hours {
    hour: string,
    rowStart: number,
    offSetTop: number
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

export interface FbPutResponse {
    name: string
}

export type field = 'firstName' | 'lastName' | 'price'
export type direction = 'start' | 'end'

export interface SortPlayers {
    field: field
    direction: direction
}