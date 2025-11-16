import React from 'react';
import LogoImg from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end '>
            <img src={LogoImg} alt="zapShift" />
            <h2 className="font-extrabold lg:text-3xl -ms-2.5">zapShift</h2>
        </div>
    );
};

export default Logo;