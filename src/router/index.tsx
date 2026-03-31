import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout.tsx";
import ProtectedRoute from "./protectedRoute.tsx";
import LoginPage from "../components/pages/LoginPage.tsx";
import RegisterPage from "../components/pages/RegisterPage.tsx";
import HomePage from "../components/pages/HomePage.tsx";
import ProductDetailPage from "../components/pages/ProductDetailPage.tsx";
import OrderPage from "../components/pages/OrderPage.tsx";
import CartPage from "../components/pages/CartPage.tsx";
import ProfilePage from "../components/pages/ProfilePage.tsx";
import SellerProductsPage from "../components/pages/SellerProductsPage.tsx";
import AdminDashboardPage from "../components/pages/AdminDashboardPage.tsx";
import CheckoutPage from "../components/pages/CheckoutPage.tsx";
import ChatPage from "../components/pages/ChatPage.tsx";


const router = createBrowserRouter ([
    {
        path:"/",
        element: <MainLayout/>,
        children: [
            {
                path:"/",
                element:<HomePage/>
            },
            {
                element: <ProtectedRoute/>,
                children: [
                    {path: "/profile", element: <ProfilePage/>},
                    {path: "/cart", element: <CartPage/>},
                    {path: "/orders", element: <OrderPage/>},
                    {path: "/checkout", element: <CheckoutPage/>},
                    {path: "/chat", element: <ChatPage/>},
                ]
            },
            {
                element: <ProtectedRoute sellerOnly/>,
                children: [
                    {path: "/seller/products", element: <SellerProductsPage/>},
                ]
            },
            {
                element: <ProtectedRoute adminOnly/>,
                children: [
                    {path: "/admin/dashboard", element: <AdminDashboardPage/>},
                ]
            },
            {
                path:"/product/:id",
                element: <ProductDetailPage/>
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