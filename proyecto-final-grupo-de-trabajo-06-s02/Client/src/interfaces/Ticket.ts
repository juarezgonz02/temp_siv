import Event, { MOCK_EVENT } from "./Event";
import { MOCK_USER, User } from "./User";

export interface Ticket {
    ticketId: string;
    eventId: Event;
    seat: string;
    state: string;
    tierId: Tier;
}

export interface Tier {
    tierId: string;
    numbered: boolean;
    requestedName: string;
    name: string;
    price: number;
}

export const MOCK_TIER: Tier = {
    tierId: "vfdgrdgrg0fgf-fgfdgxfdgrd-erwetnbv",
    numbered: false,
    requestedName: "N/A",
    name: "GENERAL",
    price: 100
};

export const DEFAULT_TICKET: Ticket = {
    ticketId: "",
    eventId: MOCK_EVENT,
    seat: "",
    state: "",
    tierId: MOCK_TIER,
};

export const MOCK_TICKETS: Ticket[] = [
    DEFAULT_TICKET
];
