import { Outlet, useNavigate } from "react-router"

import Sidebar from "../../components/backend/Sidebar";

const AdminLayout=()=>{
    const navigate=useNavigate();
    // add user token and authentication here with cookies
    return(
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar/>
            <main className="main-content">
                <Outlet/>
            </main>
        </div>
    )
}
export default AdminLayout;