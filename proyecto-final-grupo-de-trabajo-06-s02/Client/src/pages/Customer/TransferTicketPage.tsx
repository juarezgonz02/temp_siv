import { Form, Input, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import CustomerTitle from "../../components/global/CustomerTitle";
import SideBar from "../../components/global/SideBar";
import TicketCard from "../../components/global/Ticket";
import TransactionInfo from "../../components/global/TransactionInfo";
import { DEFAULT_TICKET, MOCK_TICKETS, Ticket } from "../../interfaces/Ticket";
import "../../styles/transferTicketsPage.css";
import { useWindowSize } from "usehooks-ts";
import NavigationNavBar from "../../components/global/NavigationNavBar";

const TransferTicketPage = () => {
    const [ticket, setTicket] = useState<Ticket>(DEFAULT_TICKET);
    const [form] = useForm();

    const fetchTicket = () => {
        setTicket(MOCK_TICKETS[0]);
    };

    const { width } = useWindowSize()

    useEffect(() => {
        fetchTicket();
    }, []);
    return (
        <div className='container customer-container'>
            <NavigationNavBar showTitle />
            <div className="customer-wrapper-container">
                <SideBar />
                <div className="customer-wrapper-content">
                    <CustomerTitle title="Transferencia de boleto" />
                    <div className="transfer-tickets-content">
                        <TicketCard ticket={ticket} />
                        <div className="transfer-tickets-details">
                            <div className="transfer-ticket-details-content">
                                <TransactionInfo title="Comprador original" content={`${ticket.owner?.name} ${ticket.owner?.lastName}`} />
                                <TransactionInfo title="Monto total" content={`$${ticket.price}`} />
                                <TransactionInfo title="Fecha de compra" content={ticket.buyedAt} />
                                <TransactionInfo title="Estado" content={ticket.state} />
                                <Form form={form} className="transfer-ticket-form">
                                    <Form.Item
                                    className="ticket-label-input"
                                        label={<label  style={{ color: '#0B3954'}}>Correo Electrónico</label>}
                                        name="email"
                                        labelCol={{ span: width >= 1400? 8: 24 }}
                                        rules={[{ required: true, message: 'Por favor ingrese el correo electrónico!' }]}>
                                        <Input className="ticket-input" placeholder='ejemplo@gmail.com' />
                                    </Form.Item>
                                    <div className="transfer-ticket-form-buttons" >
                                        <Tag>{width >= 1000 ? "Cancelar Transferencia" : "Cancelar"}</Tag>
                                        <Tag>{width >= 1000 ? "Confirmar Transferencia" : "Confirmar"}</Tag>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferTicketPage;