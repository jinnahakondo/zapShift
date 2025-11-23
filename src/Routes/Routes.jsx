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
import MyParcel from "../Pages/DashBoard/MyParcel/MyParcel";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/DashBoard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/DashBoard/Payment/PaymentHistory";

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
                </PrivateRoutes>,
                loader: () => fetch('./warehouses.json')
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
    {
        path: 'dashboard',
        element: <PrivateRoutes>
            <DashBoardLayout />
        </PrivateRoutes>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcel
            }, {
                path: 'payment/:payment_id',
                Component: Payment
            }
            , {
                path: 'payment-success',
                Component: PaymentSuccess
            }
            , {
                path: 'payment-history',
                Component: PaymentHistory
            }
        ]
    }

])