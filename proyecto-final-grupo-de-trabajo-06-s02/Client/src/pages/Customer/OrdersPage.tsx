import CustomerTitle from "../../components/global/CustomerTitle";
import SideBar from "../../components/global/SideBar";
import OrdersContainer from "./OrdersContainer";
import { useEffect, useState } from "react";
import Order from "../../interfaces/Order";
import NavigationNavBar from "../../components/global/NavigationNavBar";
import useMyAccount from "../../hooks/useMyAccount";

const OrdersPage = () => {
    const [orders, setOrders]= useState<Order[]>([]);
    const {getMyPurchases} = useMyAccount();

    const fetchOrders = async () => {
        const myOrders = await getMyPurchases();
        setOrders(myOrders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='container customer-container'>
            <NavigationNavBar showTitle />
            <div className="customer-wrapper-container">
                <SideBar />
                <div className="customer-wrapper-content">
                    <CustomerTitle title="Ordenes" />
                    <OrdersContainer orders={orders}/>
                </div>
            </div>
        </div>
    )
};

export default OrdersPage;