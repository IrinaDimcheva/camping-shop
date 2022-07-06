import { Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Orders from './pages/admin/Orders';
import ProductsAll from './pages/admin/ProductsAll';
import ProductsNew from './pages/admin/ProductsNew';
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
          <Route path='/admin/products/new' element={<ProductsNew />} />
          <Route path='/admin/orders' element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
