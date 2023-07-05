import CustomerTitle from "../../components/global/CustomerTitle";
import SideBar from "../../components/global/SideBar";
import OrdersContainer from "./OrdersContainer";
import { useEffect, useState } from "react";
import Order, { MOCK_ORDER } from "../../interfaces/Order";
import NavigationNavBar from "../../components/global/NavigationNavBar";
import useMyAccount from "../../hooks/useMyAccount";

const PastOrderPage = () => {
    const [orders, setOrders]= useState<Order[]>([]);
    const {getMyPastPurchases} = useMyAccount();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const myOrders = await getMyPastPurchases();
        setOrders(myOrders);
    };


    return (
        <div className='container customer-container'>
            <NavigationNavBar showTitle />
            <div className="customer-wrapper-container">
                <SideBar />
                <div className="customer-wrapper-content">
                    <CustomerTitle title="Ordenes Pasadas" />
                    <OrdersContainer orders={orders}/>
                </div>
            </div>
        </div>
    )
};

export default PastOrderPage;