import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: role = 'user', isLoading,refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}/role`)
            return (res.data);
        }
    })
    return { role, isLoading,refetch }
};

export default useRole;