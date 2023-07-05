import { Tag } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoPNG from '../../assets/Logo_N-Capas_2.png';
import { Ticket } from "../../interfaces/Ticket";
import "../../styles/ticket.css";
import TransactionInfo from "./TransactionInfo";
import useMyAccount from "../../hooks/useMyAccount";

interface Props {
    ticket: Ticket;
}

const TicketCard = ({ ticket }: Props) => {
    const [status, setStatus] = useState<string>(ticket.state);
    const navigate = useNavigate();
    const { getTicketHash } = useMyAccount();
    const [ ticketHash, setTicketHash] = useState<string>("");

    useEffect(() => {
        setStatus(ticket.state);
    }, [ticket]);

    const transferTicket = () => {
        navigate("/account/ticketTransfer/1234");
    };

    const validateTicket = async() => {
        const hash = await getTicketHash(ticket.ticketId);
        setTicketHash(hash);
        setStatus("Validar");
    };

    const cancelValidation = () => {
        setStatus("NO_VALIDATED");
    }

    const GetTicketAction = (): JSX.Element => {
        const statuses = {
            "NO_VALIDATED": (
                <>
                    <Tag onClick={transferTicket}>Transferir</Tag>
                    <Tag onClick={validateTicket}>Validar</Tag>
                </>
            ),
            "Disponible": (
                <Tag className="ticket-available">Disponible</Tag>
            ),
            "Validado": (
                <Tag>Validado</Tag>
            ),
            "Transferido": (
                <Tag>Transferido</Tag>
            ),
            "Pendiente": (
                <Tag>Cancelar</Tag>
            ),
            "Transferencia": (
                <Tag>En transferencia</Tag>
            ),
            "Validar": (
                <Tag onClick={cancelValidation}>Cancelar</Tag>
            )

        }
        return (
            <div className="ticket-status-row">
                {statuses[status as keyof typeof statuses]}
            </div>
        );
    };

    function getEventDate(): string {
        const date = new Date(ticket.eventId.date);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
      
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');
      
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
      
        return formattedDate;
      }

      function getEventTime(): string {
        const date = new Date(ticket.eventId.date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        const formattedTime = `${formattedHours}:${formattedMinutes}`;
      
        return formattedTime;
      }

    return (
        <div className="ticket-container">
            <div className="ticket-header">
                <img className='ticket-logo' src={LogoPNG} alt="logo" />
                <span className="ticket-title">SivTickets</span>
            </div>
            <div className="ticket-body">
                <p className="ticket-event">{ticket.eventId.title}</p>
                {status !== "Validar" && <TransactionInfo title="Fecha" content={getEventDate()} />}
                {status !== "Validar" && <TransactionInfo title="Hora" content={getEventTime()} />}
                <TransactionInfo title="Localidad" content={ticket.tierId.requestedName} />
                <TransactionInfo title="Asiento" content={ticket.seat} />
                {status !== "Validar" && <TransactionInfo title="Lugar" content={ticket.eventId.locationId.address} />}
                {status === "Validar" &&
                    <div className="ticket-qr">
                        <QRCodeSVG value={ticketHash} />
                        <p>{ticketHash}</p>
                    </div>}
            </div>
            <GetTicketAction />
        </div>
    );
};

export default TicketCard;