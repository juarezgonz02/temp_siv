import { useEffect, useState, useMemo } from "react";
import OrderCard from "../../components/customers/OrderCard";
import CustomerTitle from "../../components/global/CustomerTitle";
import TransactionInfo from "../../components/global/TransactionInfo";
import SideBar from "../../components/global/SideBar";
import TicketCard from "../../components/global/Ticket";
import "../../styles/orderDetailsPage.css"
import NavigationNavBar from "../../components/global/NavigationNavBar";
import { useParams } from "react-router-dom";
import useMyAccount from "../../hooks/useMyAccount";
import OrderDetails, { MOCK_ORDER_DETAILS } from "../../interfaces/OrderDetails";

const OrderDetailsPage = () => {
    const [details, setDetails] = useState<OrderDetails>(MOCK_ORDER_DETAILS);
    const { orderId } = useParams();
    const { getPurchaseById } = useMyAccount();

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const details = await getPurchaseById(orderId ?? "");
        setDetails(details);
    };

    const formatDate = (): string => {
        if (!details.purchase.date) {
            return "";
        }
        const purchaseDate = new Date(details.purchase.date);

        return purchaseDate.toUTCString();
    }

    const calculateTotalPrice = (): number => {
        if(!details){
            return 0;
        }

        return details.tickets
        .map(ticket => ticket.tierId.price)
        .reduce((prev, current) => prev + current , 0);
    }

    const totalPrice = useMemo(calculateTotalPrice, [details]);

    const getReadablePurchaseState = (): string => {
        if(!details.purchase){
            return "";
        }

        const statuses = {
            "COMPLETED": "Completada"
        }

        return statuses[details.purchase.state as keyof typeof statuses] ?? "Pendiente";
    }

    return (
        <div className='container customer-container'>
            <NavigationNavBar showTitle />
            <div className="customer-wrapper-container">
                <SideBar />
                <div className="customer-wrapper-content">
                    <CustomerTitle title="Detalles de orden" />
                    <div className="order-details-order-info">
                        <OrderCard order={details.purchase} />
                        <div className="order-details-card">
                            <div>
                                <TransactionInfo title="Comprador" content={`${details.purchase.event.title}`} />
                                <TransactionInfo title="Monto total" content={`$${totalPrice}`} />
                                <TransactionInfo title="Estado" content={getReadablePurchaseState()} />
                                <TransactionInfo title="Cantidad de tickets" content={`${details.total_tickets || 0}`} />
                                <TransactionInfo title="Fecha de compra" content={formatDate()} />
                            </div>
                        </div>
                    </div>
                    <CustomerTitle title="Mis tickets" />
                    {!!details.tickets &&
                        <div className="order-details-order-info order-tickets">
                        {details.tickets?.map(ticket => <TicketCard ticket={ticket} />)}
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
};

export default OrderDetailsPage