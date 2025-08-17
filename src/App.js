import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import ManageMenu from './pages/ManageMenu';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route path="/manageMenu" element={<ManageMenu/>}></Route>
          <Route path='/addProduct' element={<AddProduct/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
