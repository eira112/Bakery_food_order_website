import { Outlet, useNavigate } from "react-router"

import Sidebar from "../../components/backend/Sidebar";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const AdminLayout=()=>{
    const navigate=useNavigate();
    useEffect(() => {
    const authToken = localStorage.getItem('authToken');
        if(authToken!=='admin12') {
        toast.error("You have not logged in yet! Log in and try again.");
        navigate('/login');
        }
    }, []);
    // add user token and authentication here with cookies
    return(
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar/>
            <main className="main-content flex-1 p-6">
                <Outlet/>
            </main>
        </div>
    )
}
export default AdminLayout;