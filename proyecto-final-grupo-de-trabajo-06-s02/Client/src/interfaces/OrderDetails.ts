import Order, { MOCK_ORDER } from "./Order";
import { MOCK_TICKETS, Ticket } from "./Ticket";

export default interface OrderDetails {
  purchase: Order;
  total_tickets: number;
  tickets: Ticket[];
}

export const MOCK_ORDER_DETAILS: OrderDetails = {
  purchase: MOCK_ORDER,
  total_tickets: 1,
  tickets: MOCK_TICKETS
}