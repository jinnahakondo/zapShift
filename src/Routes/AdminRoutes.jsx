import React from 'react';
import useRole from '../Hook/useRole';
import Loader from '../Components/Logo/Loader/Loader';
import { useNavigate } from 'react-router';

const AdminRoutes = ({ children }) => {
    const navigate = useNavigate()
    const { role, isLoading } = useRole();
    if (isLoading) {
        <Loader />
    }
    if (role.role !== 'admin') {
        navigate(-1)
    }
    return children
};

export default AdminRoutes;