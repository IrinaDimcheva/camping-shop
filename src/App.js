import { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import Cart from './user/components/Cart';
import Orders from './admin/Orders';
import ProductsAll from './products/pages/ProductsAll';
import ProductsCategory from './products/pages/ProductsCategory';
import ProductNew from './products/pages/ProductNew';
import ProductDetails from './products/pages/ProductDetails';
import Home from './products/pages/Home';
import Login from './user/pages/Login';
import Register from './user/pages/Register';
import ProductEdit from './products/pages/ProductUpdate';
import AuthContext from './shared/context/auth-context';
import { AuthContextProvider } from './shared/context/auth-context';
import { CartProvider } from './shared/context/cart-context';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let routes;
  if (authCtx.isLoggedIn) {
    routes = (
      <>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsAll />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products/category/:category' element={<ProductsCategory />} />
      </>
    );
  } else if (authCtx.isLoggedIn && authCtx.isAdmin) {
    routes = (
      <>
        <Route path='/' element={<Home />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/products/new' element={<ProductNew />} />
        <Route path='/products' element={<ProductsAll />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products/category/:category' element={<ProductsCategory />} />
        <Route path='/products/:productId/edit' element={<ProductEdit />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<ProductsAll />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products/category/:category' element={<ProductsCategory />} />
      </>
    );
  }

  return (
    <AuthContextProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <div className="container">
            <Routes>
              {routes}
              {/* <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<ProductsAll />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/products/category/:category' element={<ProductsCategory />} />
            <Route path='/products/:productId/edit' element={<ProductEdit />} />
            <Route path='/products/new' element={<ProductNew />} />
            <Route path='/admin/orders' element={<Orders />} /> */}
            </Routes>
          </div>
        </main>
        <Footer />
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
