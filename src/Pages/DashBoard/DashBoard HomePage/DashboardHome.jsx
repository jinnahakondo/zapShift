import React from 'react';
import useRole from '../../../Hook/useRole';
import Loader from '../../../Components/Logo/Loader/Loader';
import AdminDashBoardHome from './AdminDashBoardHome';
import RiderDashBoardHome from './RiderDashBoardHome';
import UserDashBoardHome from './UserDashBoardHome';

const DashboardHome = () => {

    const { role, isLoading } = useRole();

    if (isLoading) <Loader />

    if (role.role === 'admin') {
        return <AdminDashBoardHome />
    }

    else if (role.role === 'rider') {
        return <RiderDashBoardHome />
    }

    else {
        return <UserDashBoardHome />
    }
};

export default DashboardHome;