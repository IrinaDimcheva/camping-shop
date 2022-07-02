import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={classes.wrapper}>
        <p className={classes.logo}><i className="fa-brands fa-accusoft"></i>CampingShop</p>
        <nav>
          <ul>
            <li><NavLink to='/favorites'><i className="fa-solid fa-heart"></i>Favorites</NavLink></li>
            <li><NavLink to='/cart'><i className="fa-solid fa-cart-shopping"></i>Cart</NavLink></li>
            {/* <li><NavLink></NavLink></li>
          <li><NavLink></NavLink></li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;