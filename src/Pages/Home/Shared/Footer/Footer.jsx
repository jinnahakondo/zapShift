import React from 'react';
import Logo from '../../../../Components/Logo/Logo';
import { NavLink } from 'react-router';

const Footer = () => {
    const links = <>
        <li><NavLink to={''}>Services</NavLink></li>
        <li><NavLink to={'/covarage'}>Coverage</NavLink></li>
        <li><NavLink to={''}>About Us</NavLink></li>
        <li><NavLink to={''}>Pricing</NavLink></li>
        <li><NavLink to={''}>Blog</NavLink></li>
        <li><NavLink to={''}>Contact</NavLink></li>
    </>

    return (
        <div className='pb-12'>
            <footer className="footer footer-horizontal footer-center p-10 bg-black rounded-4xl ">
                <aside>
                    <div className='text-white'>
                        <Logo />
                    </div>
                    <p className="font-bold text-[#DADADA]">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.
                    </p>

                </aside>
                <nav>
                    <ul className='text-[#DADADA] flex items-center gap-5 flex-col md:flex-row'>
                        {links}
                    </ul>
                    <div className="grid grid-flow-col gap-4">

                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;