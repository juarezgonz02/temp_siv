import React from 'react'
import '../../styles/banner.css'

const Banner: React.FC <BannerProps> = (props) => {
    return (
        <div>
            <div className='container-banner'>
                <label className='banner-text-prop'>{props.text}</label>
            </div>
        </div>
    )
}

interface BannerProps {
    text: String;
}
export default Banner