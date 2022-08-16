import { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import Cart from './user/components/Cart';
// import Login from './user/pages/Login';
import AuthContext from './shared/context/auth-context';
import { AuthContextProvider } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { checkAuth } from './services/auth-service';
import './App.css';

const ProductsAll = lazy(() => import('./products/pages/ProductsAll'));
const ProductsCategory = lazy(() => import('./products/pages/ProductsCategory'));
const ProductNew = lazy(() => import('./products/pages/ProductNew'));
const ProductDetails = lazy(() => import('./products/pages/ProductDetails'));
const Home = lazy(() => import('./products/pages/Home'));
const Login = lazy(() => import('./user/pages/Login'));
const Register = lazy(() => import('./user/pages/Register'));
const ProductEdit = lazy(() => import('./products/pages/ProductUpdate'));
const Orders = lazy(() => import('./admin/Orders'));


function App() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, login } = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    checkAuth().then(user => {
      console.log(user);
      login(user);
      setChecked(true);
      if (!user.ok) {
        navigate('/login');
        return;
      }
    })
      .catch(err => {
        console.log(err);
        navigate('/login');
      });
  }, []);

  if (!checked) { return null; }

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <AuthContextProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <div className="container centered">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<ProductsAll />} />
              <Route path='/products/:productId' element={<ProductDetails />} />
              <Route path='/products/category/:category' element={<ProductsCategory />} />
              {!isLoggedIn && <Route path='/login' element={<Login />} />}
              <Route path='/register' element={<Register />} />
              {/* {isLoggedIn && isAdmin && ( */}
              <Route path='/products/:productId/edit' element={<ProductEdit />} />
              {/* // )} */}
              {/* {isLoggedIn && isAdmin && ( */}
              <Route path='/products/new' exact element={<ProductNew />} />
              {/* // )} */}
              {isLoggedIn && isAdmin && (
                <Route path='/admin/orders' element={<Orders />} />
              )}
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
