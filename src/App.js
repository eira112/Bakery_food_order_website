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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* frontend routes */}
          <Route path='/' element={<HomePage/>}/>
          <Route path='/description/:id' element={<Description/>}/>
          <Route path='/cart' element={<Cart/>}/>

          {/* Backend routes */}
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>

          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/manageMenu' element={<ManageMenu/>}/>
            <Route path='/admin/manageMenu/addProduct' element={<AddProduct/>}/>
            <Route path='/admin/manageMenu/edit/:id' element={<AddProduct/>}/>
            
          </Route>
          <Route path='/dash' element={<CoffeeCottageDashboard/>}/>
          <Route path='/manageOrder' element={<ManageOrder/>}/>
          
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
      
    </>
  );
}

export default App;
