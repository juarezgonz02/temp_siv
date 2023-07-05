import '../../styles/orders.css';
import OrderCard from "../../components/customers/OrderCard";
import Order from "../../interfaces/Order";

interface Props {
    orders: Order[];
}

const OrdersContainer = ({ orders }: Props) => {
    return (
        <div className="orders-container">
            {!!orders && orders.map(order => <OrderCard order={order}/>)}
        </div>
    );
};

export default OrdersContainer;