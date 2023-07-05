import "../../styles/customerForm.css";

interface Props {
    title: string;
    children?: React.ReactNode;
    last?: boolean;
}

const CustomerForm = ({ title, children, last }: Props) => {
    return (
        <div className={`customer-form-container ${last ? "customer-form-last" : ""} `}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default CustomerForm;