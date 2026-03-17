import { Outlet } from "react-router-dom";

export default function MainLayout(){

    return(
        <div>
            <div>
                Navbar
            </div>
            <Outlet/>
            <div>
                Footer
            </div>
        </div>
    )
}