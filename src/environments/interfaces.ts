export type court = string | number
export interface User {
    userId?: string,
    firstName: string,
    lastName: string,
    price: number,
    note?: string
}

export interface Reservation {
    reservationId?: string,
    year: string,
    month: string,
    day: string,
    court: court,
    timeStart: string,
    timeEnd: string,
    rowStart: number,
    duration: number,
    rowEnd?: number,
    user: User,
    isActive?: boolean
}

export interface Hours {
    hour: string,
    rowStart: number
}