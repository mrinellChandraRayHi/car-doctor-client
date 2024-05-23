import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Checkout from "../Pages/Checkout";
import BookService from "../Pages/BookService";
import Bookings from "../Pages/Bookings";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signUp',
                element:<SignUp/>
            },
            {
                path:'/checkout/:id',
                element:<PrivateRouter><Checkout/></PrivateRouter>,
                loader:({params})=>fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path:'book/:id',
                element:<PrivateRouter><BookService/></PrivateRouter>,
                loader:({params})=>fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path:'/bookings',
                element:<PrivateRouter><Bookings/></PrivateRouter>
            }
        ]
    },
])