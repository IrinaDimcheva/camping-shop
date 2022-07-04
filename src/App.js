import { Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
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
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
