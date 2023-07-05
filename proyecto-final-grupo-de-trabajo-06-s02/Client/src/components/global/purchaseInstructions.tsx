import React from 'react'
import '../../styles/confirmingPurchase.css'

const PurchaseInstructions: React.FC<purchaseInstructionsProps> = ({textDescription}) => {
    return (
        <div className='container-instructions'>
                <label className='instruction-title'>Instrucciones:</label>
                <label className='instruction-description'>{textDescription}</label>
        </div>
    )
}

interface purchaseInstructionsProps {
    textDescription: string;
}

export default PurchaseInstructions
