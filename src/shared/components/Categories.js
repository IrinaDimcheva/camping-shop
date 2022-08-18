import { Link } from 'react-router-dom';

import styles from './Categories.module.css';

const Categories = () => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.categories}>
        <li>
          <Link to='/products/category/campingEquipment'>
            <h2>Camping Equipment</h2>
            <div className={styles.media}>
              <img src='/images/camping-equipment.jpg' alt="camping-equipment" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/category/tents'>
            <h2>Tents</h2>
            <div className={styles.media}>
              <img src='/images/tent.jpg' alt="tent" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/category/sleepingBags'>
            <h2>Sleeping Bags & Mats</h2>
            <div className={styles.media}>
              <img src='/images/sleeping-bags.jpg' alt="sleeping-bags" />
            </div>
          </Link>
        </li>
        <li>
          <Link to='/products/category/accessories'>
            <h2>Accessories</h2>
            <div className={styles.media}>
              <img src='/images/accessories.jpg' alt="accessories" />
            </div>
          </Link>
        </li>
      </ul>
      <Link to='/products' className={styles.all}>
        All Products
      </Link>
    </section>
  );
}

export default Categories;