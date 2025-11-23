import axios from 'axios';
import React, { useEffect, } from 'react';
import { useNavigate } from "react-router";
import useAuth from '../Hooks/useAuth';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {

    const { user, logOut } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        // interceptor request 
        const reqInterceptor = instance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })

        //interceptor response
        const resInterceptor = instance.interceptors.response.use((res) => {
            return res;
        }, (error) => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => {
                        navigate('/loging')
                    })
            }
            return Promise.reject(error);
        })

        return () => {
            instance.interceptors.request.eject(reqInterceptor)
            instance.interceptors.response.eject(resInterceptor)
        }

        //interceptor response
    }, [user, logOut, navigate])
    return instance
};

export default useAxiosSecure;