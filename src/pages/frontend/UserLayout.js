import { Outlet } from "react-router"
import Navbar from "../../components/frontend/Navbar"

const UserLayout=()=>{
    return(
        <div className="home-page">
            <Navbar/>
            <Outlet/>

        </div>
    )
}
export default UserLayout;