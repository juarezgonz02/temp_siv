import '../../styles/customerTitle.css';


interface Props {
    title: string;
}

const CustomerTitle = ({ title }: Props) => {
    return (
        <div className='customer-title-container'>
            <h1 className='customer-title-text'>{title}</h1>
            <hr className='customer-title-divider'/>
        </div>
    );
};

export default CustomerTitle;