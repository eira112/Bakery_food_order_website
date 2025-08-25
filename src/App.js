import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import ManageMenu from './pages/backend/ManageMenu';
import AddProduct from './pages/backend/AddProduct';
import { ToastContainer } from 'react-toastify';
import ManageOrder from './pages/backend/ManageOrder';
import AdminLayout from './pages/backend/AdminLayout';
import CoffeeCottageDashboard from './pages/backend/CoffeeCottageDashboard';
import HomePage from './pages/frontend/HomePage';
import Description from './pages/frontend/Description';
import Cart from './pages/frontend/Cart';
import Checkout from './pages/frontend/Checkout';
import CustomCake from './pages/frontend/CustomCake';
import UserLayout from './pages/frontend/UserLayout';
import CustomRequest from './pages/backend/CustomRequest';
import MyOrder from './pages/frontend/MyOrder';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* frontend routes */}
          <Route path='/' element={<UserLayout/>}>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/description/:id' element={<Description/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/customCake' element={<CustomCake/>}/>
            <Route path='/myOrder' element={<MyOrder/>}/>
          </Route>
          

          {/* Backend routes */}
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>

          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/manageMenu' element={<ManageMenu/>}/>
            <Route path='/admin/manageMenu/addProduct' element={<AddProduct/>}/>
            <Route path='/admin/manageMenu/edit/:id' element={<AddProduct/>}/>
            <Route path='/admin/manageOrder' element={<ManageOrder/>}/>
            <Route path='/admin/customRequest' element={<CustomRequest/>}/>
            
            
          </Route>
          <Route path='/dash' element={<CoffeeCottageDashboard/>}/>
          
          
          
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
      
    </>
  );
}

export default App;
