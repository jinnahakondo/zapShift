import React from 'react';
import useRole from '../Hook/useRole';
import useAuth from '../Hooks/useAuth';
import Loader from '../Components/Logo/Loader/Loader';

const RiderRoute = ({ children }) => {
    const { role, isLoading } = useRole();
    const { logOut, loading, user } = useAuth()

    if (isLoading || loading || !user) {
        return < Loader />

    }
   else if (role.role !== 'rider') {
        logOut()

        return;
    }
    return children
};

export default RiderRoute;