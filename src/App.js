import { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import Cart from './user/components/Cart';
import AuthContext from './shared/context/auth-context';
import { AuthContextProvider } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { getProfile } from './services/auth-service';
import ErrorBoundary from './shared/components/ErrorBoundary';
import './App.css';

const ProductsAll = lazy(() => import('./products/pages/ProductsAll'));
const ProductsCategory = lazy(() => import('./products/pages/ProductsCategory'));
const ProductNew = lazy(() => import('./products/pages/ProductNew'));
const ProductDetails = lazy(() => import('./products/pages/ProductDetails'));
const Home = lazy(() => import('./shared/pages/Home'));
const Login = lazy(() => import('./user/pages/Login'));
const Register = lazy(() => import('./user/pages/Register'));
const ProductEdit = lazy(() => import('./products/pages/ProductUpdate'));
const OrderForm = lazy(() => import('./products/pages/OrderForm'));
const Favorites = lazy(() => import('./user/pages/Favorites'));
const Profile = lazy(() => import('./user/pages/Profile'));
const Orders = lazy(() => import('./admin/Orders'));
// const FOF = lazy(() => import('./shared/pages/FOF'));


function App() {
  const navigate = useNavigate();
  const { user, isAdmin, login } = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getProfile().then(user => {
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
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path='/' element={<Home title='CampingShop' />} />
                <Route path='/products' element={
                  <ProductsAll title='CampingShop | Products' />
                } />
                <Route path='/products/:productId' element={
                  <ProductDetails title='CampingShop | Product Details' />
                } />
                <Route path='/products/category/:category' element={
                  <ProductsCategory title='CampingShop | Products' />
                } />
                <Route path='/login' element={
                  <Login user={!user} title='CampingShop | Login' />
                } />
                <Route path='/register' element={
                  <Register user={!user} title='CampingShop | Register' />
                } />
                <Route path='/order' element={
                  <OrderForm user={user} title='CampingShop | Order' />
                } />
                <Route path='/profile' element={
                  <Profile user={user} title='CampingShop | Profile' />
                } />
                <Route path='/favorites' element={
                  <Favorites user={user} title='CampingShop | Favorites' />
                } />
                <Route path='/products/:productId/edit' element={
                  <ProductEdit isAdmin={isAdmin} title='CampingShop | Product Edit' />
                } />
                <Route path='/products/new' exact element={
                  <ProductNew isAdmin={isAdmin} title='CampingShop | Product New' />
                } />
                <Route path='/admin/orders' element={<Orders isAdmin={isAdmin} />} />
                <Route path='*' element={<Navigate to='/' />} />
                {/* <Route path='*' element={<FOF title='CampingShop | 404' />} /> */}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
