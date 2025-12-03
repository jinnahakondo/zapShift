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
import ManageRiders from "../Pages/DashBoard/Riders/ManageRiders";
import ManageUsers from "../Pages/DashBoard/ManageUsers/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import Loader from "../Components/Logo/Loader/Loader";
import AssignRider from "../Pages/DashBoard/Riders/AssignRider";
import RiderRoute from "./RiderRoute";
import AssignedDelivery from "../Pages/DashBoard/Riders/AssignedDelivery";
import ErrorPage from "../Pages/Error/ErrorPage";
import CompletedDelivres from "../Pages/DashBoard/Riders/CompletedDelivres";
import TrcakParcel from "../Pages/TrackParcel";
import DashboardHome from "../Pages/DashBoard/DashBoard HomePage/DashboardHome";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home,
                hasErrorBoundary: Loader
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
                </PrivateRoutes>,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: '/covarage',
                Component: Covarage,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: '/track-parcel/:trackingId',
                Component: TrcakParcel
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
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes>
            <DashBoardLayout />
        </PrivateRoutes>,
        children: [
            {
                index:true,
                Component:DashboardHome
            }
            ,
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

            //addmin only routes
            , {
                path: 'riders',
                element: <AdminRoutes>
                    <ManageRiders />
                </AdminRoutes>
            }
            , {
                path: 'completed-delivry',
                element: <AdminRoutes>
                    <CompletedDelivres />
                </AdminRoutes>
            }
            , {
                path: 'assign-rider',
                element: <AdminRoutes>
                    <AssignRider />
                </AdminRoutes>
            }
            , {
                path: 'manage-users',
                element: <AdminRoutes>
                    <ManageUsers />
                </AdminRoutes>
            },

            // rider only routes 

            {
                path: 'assigned-delevery',
                element: <RiderRoute>
                    <AssignedDelivery />
                </RiderRoute>
            }
        ]
    }

])