import { Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Order from "../../interfaces/Order";
import "../../styles/orderCard.css"

interface Props {
    order: Order;
}

const OrderCard = ({ order }: Props) => {
    const { event, date, purchaseId, } = order;

    const formatDate = (): string => {
        if(!date) {
            return "";
        }

        const eventDate = new Date(date);
        return eventDate.toUTCString();
    };

    return (
        <div className="ordercard-container">
            <img src={event.banner} className={'ordercard-img'} alt="imagen" />
            <div className="ordercard-info">
                <label className={'ordercard-date'}>{formatDate()}</label>
                <Tag className="ordercard-type">{event.category.name}</Tag>
            </div>
            <h3 className={'ordercard-title'}>{event.title}</h3>
            <Link to={`/account/orders/${purchaseId}`}>
                <Tag className="ordercard-button" > Ver Detalles </Tag>
            </Link>
        </div>
    );
};

export default OrderCard;