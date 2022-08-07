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
import { AuthContextProvider } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';

function App() {
  const { token, userId, isAdmin, login, logout } = useAuth();

  // let routes;
  // if (token) {
  //   routes = (
  //     <>
  //       <Route path='/' element={<Home />} />
  //     </>
  //   );
  // } else if (token && isAdmin) {
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
            <Route path='/products' element={<ProductsAll />} />
            <Route path='/products/:category' element={<ProductsAll />} />
            <Route path='/admin/products/new' element={<ProductNew />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/admin/orders' element={<Orders />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
