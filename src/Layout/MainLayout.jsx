import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Pages/Home/Shared/NavBar/NavBar';
import Footer from '../Pages/Home/Shared/Footer/Footer';


const MainLayout = () => {
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;