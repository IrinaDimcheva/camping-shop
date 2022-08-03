import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import styles from './Header.module.css';

const Header = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, userId, isAdmin, login, logout } = useContext(AuthContext);

  console.log(isLoggedIn, userId, isAdmin, login, logout);

  return (
    <header>
      <div className={styles.wrapper}>
        <Link to='/' className={styles.logo}>
          <i className="fa-brands fa-accusoft"></i>
          CampingShop
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to='/favorites'>
                <i className="fa-solid fa-heart"></i>Favorites
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to='/cart'>
                <i className="fa-solid fa-cart-shopping"></i>Cart
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/products' className={(navData) => navData.isActive ? styles.active : ''}>
                Manage Products
              </NavLink>
            </li>
            {auth.isLoggedIn && auth.isAdmin && (
              <li>
                <NavLink to='/admin/orders' className={(navData) => navData.isActive ? styles.active : ''}>
                  Manage Orders
                </NavLink>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li>
                <NavLink to='/login' className={(navData) => navData.isActive ? styles.active : ''}>
                  Login
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <button onClick={auth.logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;