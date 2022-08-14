import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import AuthContext from '../context/auth-context';
import CartContext from '../context/cart-context';
import styles from './Header.module.css';

const Header = (props) => {
  const auth = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items)
  // const cartItemsNumber = cartCtx.items.reduce((acc, curr) => {
  //   return acc + curr.quantity;
  // }, 0);

  return (
    <header>
      <div className={styles.wrapper}>
        <Link to='/' className={styles.logo}>
          <i className="fa-brands fa-accusoft"></i>
          CampingShop
        </Link>
        <nav>
          <ul>
            {auth.isLoggedIn && !auth.isAdmin && (
              <li>
                <NavLink className={(navData) => navData.isActive ? styles.active : ''} to='/profile'>
                  <i class="fa-solid fa-user"></i>
                  <sup className={`${styles.badge} ${styles['profile-badge']}`}>2</sup> Profile
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && !auth.isAdmin && (
              <li>
                <NavLink className={(navData) => navData.isActive ? styles.active : ''} to='/favorites'>
                  <i className="fa-solid fa-heart"></i>
                  <sup className={`${styles.badge} ${styles['favorites-badge']}`}>2</sup> Favorites
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && !auth.isAdmin && (
              <li>
                {/* <NavLink
                  className={(navData) => navData.isActive ? styles.active : ''}
                  to='/cart'
                  onClick={props.onShowCart}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <sup className={`${styles.badge} ${styles['cart-badge']}`}>2</sup> Cart
                </NavLink> */}
                <button
                  className={styles.link}
                  onClick={props.onShowCart}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <sup className={`${styles.badge} ${styles['cart-badge']}`}>
                    {cartCtx.items.length}
                    {/* {cartItemsNumber} */}
                  </sup> Cart
                </button>
              </li>
            )}
            {/* {auth.isLoggedIn && auth.isAdmin && (
              <li>
                <NavLink to='/products' className={(navData) => navData.isActive ? styles.active : ''}>
                  Manage Products
                </NavLink>
              </li>
            )} */}
            {auth.isLoggedIn && auth.isAdmin && (
              <li>
                <NavLink to='/products/new' className={(navData) => navData.isActive ? styles.active : ''}>
                  Add Product
                </NavLink>
              </li>
            )}
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
                <button className={styles.link} onClick={auth.logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;