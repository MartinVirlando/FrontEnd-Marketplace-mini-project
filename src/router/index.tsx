import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout.tsx";
import ProtectedRoute from "./protectedRoute.tsx";
import LoginPage from "../components/pages/LoginPage.tsx";
import RegisterPage from "../components/pages/RegisterPage.tsx";


const router = createBrowserRouter ([
    {
        path:"/",
        element: <MainLayout/>,
        children: [
            {
                path:"/",
                element:<div>"home"</div>
            },
            {
                element: <ProtectedRoute/>,
                children: [
                    {path: "/profile", element: <div>"profile"</div>},
                    {path: "/cart", element: <div>"cart"</div>},
                ]
            },
            {
                element: <ProtectedRoute sellerOnly/>,
                children: [
                    {path: "/seller/products", element: <div>"seller"</div>},
                ]
            },
            {
                element: <ProtectedRoute adminOnly/>,
                children: [
                    {path: "/admin/dashboard", element: <div>"admin"</div>},
                ]
            },

        ]

    },
    {
        path:"/login",
        element: <LoginPage/>
    },
    {
        path:"/register",
        element: <RegisterPage/>
    },
    
])

export default router;