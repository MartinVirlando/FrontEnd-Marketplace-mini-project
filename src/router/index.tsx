import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout.tsx";


const router = createBrowserRouter ([
    {
        path:"/",
        element: <MainLayout/>,
        children: [
            {
                path:"/",
                element:<div>"home"</div>
            },
        ]

    },
    {
        path:"/login",
        element:<div>"login"</div>
    },
    {
        path:"/register",
        element: <div>"register"</div>
    },
])

export default router;