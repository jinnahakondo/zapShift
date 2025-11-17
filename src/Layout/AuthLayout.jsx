import React from 'react';
import Logo from '../Components/Logo/Logo';
import authImage from '../assets/authImage.png'
import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className='pt-11 mx-auto max-w-7xl px-4 min-h-screen'>
            <Logo />

            <div className='flex flex-col lg:flex-row justify-between mt-24 gap-10 items-center'>
                {/* left div  */}
                <div className=' flex-1'>
                    <Outlet />
                </div>
                {/* right div  */}
                <div className='flex-1'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;