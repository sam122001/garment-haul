import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import SingleCategory from './pages/SingleCategory';
import Cart from './pages/Cart/Cart';
import Customer from './pages/Customer';
import AddProducts from './pages/AddProducts';
import AdminCustomer from './pages/AdminCustomer';
import { Flip, ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
       {/* <ToastContainer toastClassName='toastContainerBox' transition={Flip} position='top-center' /> */}
      {!isAuthRoute && <Navbar />} {/* Render navbar only if not on login or signup page */}
      <div className='margin'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/register" element={<Signup />} />
          <Route path='/Detail/type/:cat/:id' element={<ProductDetails />} />
          <Route path="/product" element={<Shop />} />
          <Route path="/product/:cat" element={<SingleCategory />} />
          <Route path="/productcat/:productId" element={<ProductDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admincustomer" element={<AdminCustomer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
