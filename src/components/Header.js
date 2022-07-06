import { NavLink, Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <Link to='/' className={styles.logo}><i className="fa-brands fa-accusoft"></i>CampingShop</Link>
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
            <li>
              <NavLink to='/admin/orders' className={(navData) => navData.isActive ? styles.active : ''}>
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' className={(navData) => navData.isActive ? styles.active : ''}>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;