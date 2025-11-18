import React from 'react';
import Logo from '../../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import Arrow from '../../../../assets/arrowIcon.png';
import useAuth from '../../../../Hooks/useAuth';
import { toast } from 'react-toastify';

const NavBar = () => {
    const { loading, user, logOut } = useAuth()
    const handelLogOut = () => {
        logOut()
            .then(() => {
                toast.success("log out successfully")
            })
            .catch(error => toast.error(error.code))
    }
    const links = <>
        <li><NavLink to={'/services'}>Services</NavLink></li>
        <li><NavLink to={'/covarage'}>Coverage</NavLink></li>
        <li><NavLink to={'/about'}>About Us</NavLink></li>
        <li><NavLink to={'/send-parcel'}>Send a parcel</NavLink></li>
        <li><NavLink to={'/be-a-rider'}>Be a Rider</NavLink></li>
        {/* <li><NavLink to={''}>Blog</NavLink></li>
        <li><NavLink to={''}>Contact</NavLink></li> */}
    </>

    if (loading) return <p>loading...</p>

    return (
        <div className='pt-7'>
            <div className="navbar bg-white shadow-sm border border-[#DADADA] p-6 rounded-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-medium text-base text-accent">
                            {links}
                        </ul>
                    </div>
                    <span className="btn btn-ghost text-xl "><Logo /></span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium text-base text-accent">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    {user ?
                        <button onClick={handelLogOut} className="btn btn-primary border  border-[#DADADA] text-accent rounded-2xl font-bold  lg:text-xl">Sign out</button>
                        :
                        <>
                            <Link to={'/login'} className="btn btn-primary border  border-[#DADADA] text-accent rounded-2xl font-bold  lg:text-xl">Sign In</Link>
                            {/* <div className='flex items-center'>
                                <Link className="btn btn-primary text-black rounded-2xl font-bold  lg:text-xl">Sign up</Link>
                                <img src={Arrow} className='w-10 h-10 ' />
                            </div> */}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;