import { Link } from 'react-router-dom';

import styles from './Categories.module.css';
// import campingEquipment from '../images/Camping-equipment.png';
import campingEquipment from '../../images/camping-equipment.jpg';
import tent from '../../images/tent.jpg';
import accessories from '../../images/accessories.jpg';
import sleepingBags from '../../images/sleeping-bags.jpg';

const Categories = () => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.categories}>
        <li>
          <Link to='/products/camping-equipment'>
            <h2>Camping Equipment</h2>
            <div className={styles.media}>
              <img src={campingEquipment} alt="camping-equipment" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/tents'>
            <h2>Tents</h2>
            <div className={styles.media}>
              <img src={tent} alt="tent" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/sleeping-bags'>
            <h2>Sleeping Bags & Mats</h2>
            <div className={styles.media}>
              <img src={sleepingBags} alt="sleepingBags" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/accessories'>
            <h2>Accessories</h2>
            <div className={styles.media}>
              <img src={accessories} alt="accessories" />
            </div>
          </Link>
        </li>
      </ul>
      <Link to='/products/all' className={styles.all}>
        All Products
      </Link>
    </section>
  );
}

export default Categories;