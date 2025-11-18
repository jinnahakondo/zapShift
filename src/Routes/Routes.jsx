import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/HOme/Home";
import Covarage from "../Pages/Covarage/Covarage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import BeARider from "../Pages/Be A Rider/BeARider";
import PrivateRoutes from "./PrivateRoutes";
import SendPercel from "../Pages/Send Percel/SendPercel";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/services',
                element: <p>Services</p>
            },
            {
                path: 'about',
                element: <p>About us</p>
            },
            {
                path: '/pricing',
                element: <p>pricing</p>
            },
            {
                path: '/send-parcel',
                element: <PrivateRoutes>
                    <SendPercel />
                </PrivateRoutes>
            },
            {
                path: '/be-a-rider',
                element: <PrivateRoutes>
                    <BeARider />
                </PrivateRoutes>
            },
            {
                path: '/covarage',
                Component: Covarage,
                loader: () => fetch('./warehouses.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },

])