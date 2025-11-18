import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    console.log(location);
    const { user, loading } = useAuth()
    if (loading) {
        return <p>loading...</p>
    }
    if (!user) return <Navigate to='/login' state={location.pathname} />
    return children
};

export default PrivateRoutes;