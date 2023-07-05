import "../../styles/personalInfo.css";

interface Props {
    title: string;
    content: string
}

const TransactionInfo = ({title, content}: Props) => {
    return (
        <div className="personal-info-container">
            <p className="personal-info-title">{title}</p>
            <p className="personal-info-content">{content}</p>
        </div>
    );
};

export default TransactionInfo;