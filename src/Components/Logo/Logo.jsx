import React from 'react';
import LogoImg from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
       <Link to='/'>
         <div className='flex items-end '>
            <img src={LogoImg} alt="zapShift" />
            <h2 className="font-extrabold lg:text-3xl -ms-2.5">zapShift</h2>
        </div>
        </Link>
    );
};

export default Logo;