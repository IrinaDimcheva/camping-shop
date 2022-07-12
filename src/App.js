import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import Orders from './pages/admin/Orders';
import ProductsAll from './admin/products-all/ProductsAll';
import ProductNew from './admin/product-new/ProductNew';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/products' element={<ProductsAll />} />
          <Route path='/admin/products/new' element={<ProductNew />} />
          <Route path='/admin/orders' element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
