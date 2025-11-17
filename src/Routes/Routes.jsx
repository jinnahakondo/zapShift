import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/HOme/Home";
import Covarage from "../Pages/Covarage/Covarage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
        ]
    },
    {
        path: '/covarage',
        Component: Covarage,
        loader: () => fetch('./warehouses.json')
    }
])