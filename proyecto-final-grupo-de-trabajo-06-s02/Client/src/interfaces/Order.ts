import Event, { MOCK_EVENT } from './Event';

export default interface Order{
    purchaseId: string;
    state: string;
    paidPrice: number; 
    date: Date;
    cantTickets: number;
    event: Event;
}

export const MOCK_ORDER: Order = {
    purchaseId: "rejkzbzdkbkkSear",
    state: "ddsgsgwe",
    paidPrice: 100,
    date: new Date(),
    cantTickets: 100,
    event: MOCK_EVENT
}