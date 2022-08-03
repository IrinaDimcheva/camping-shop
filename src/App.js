import { Route, Routes } from 'react-router-dom';

import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import Orders from './admin/Orders';
import ProductsAll from './products/pages/ProductsAll';
import ProductNew from './products/pages/ProductNew';
import Home from './products/pages/Home';
import Login from './user/pages/Login';
import Register from './user/pages/Register';
import ProductDetail from './products/pages/ProductDetail';
import { AuthContext, AuthContextProvider } from './shared/context/auth-context';
import './App.css';
import { useContext } from 'react';

function App() {
  const { isLoggedIn, userId, isAdmin, login, logout } = useContext(AuthContext);

  // let routes;
  // if (isLoggedIn) {
  //   routes = (
  //     <>
  //       <Route path='/' element={<Home />} />
  //     </>
  //   );
  // } else if (isLoggedIn && isAdmin) {
  //   routes = (
  //     <>
  //       <Route path='/' element={<Home />} />
  //       <Route path='/admin/orders' element={<Orders />} />
  //       <Route path='/admin/products/new' element={<ProductNew />} />
  //     </>
  //   );
  // } else {
  //   routes = (
  //     <>
  //       <Route path='/' element={<Home />} />
  //       <Route path='/login' element={<Login />} />
  //       <Route path='/register' element={<Register />} />

  //     </>
  //   );
  // }

  return (
    <AuthContextProvider>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin/products' element={<ProductsAll />} />
            <Route path='/products/:category' element={<ProductsAll />} />
            <Route path='/admin/products/new' element={<ProductNew />} />
            <Route path='/admin/products/:productId' element={<ProductDetail />} />
            <Route path='/admin/orders' element={<Orders />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
