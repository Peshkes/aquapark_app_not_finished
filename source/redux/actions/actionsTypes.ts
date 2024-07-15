import { string } from "yup";

export type OrderAndTicketsResponse = {
    order: Order,
    orderItems: Array<TicketsByOrder>
}

export type TicketsByOrder = {
    ticketType: string
    orderItemId: string
    institutionTicketsId: string
    count: number
}

export type Order = {
    orderId: string
    status: string
    datePaid: Date
    dateChanged: Date
    institutionId: string
    sum: number
}

export type WhoIsInResponseItem = {
    ticketType: string;
    timeLeft: number;
    extra: number;
}
