import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductItem from "./product-item/ProductItem";
import styles from './ProductsAll.module.css';
import { getAll } from '../../services/admin-product-service';

const ProductsAll = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then(result => {
      setProducts(result.products);
      console.log(result.products)
    }).catch(err => console.log(err));
  }, []);
  // method: 'POST',
  // mode: 'cors',
  // credentials: 'include',

  return (
    <div className={`${"centered"} ${styles.container}`}>
      <h1>Products Administration</h1>
      <section>
        <h2>Manage Products</h2>
        <p><Link to="/admin/products/new" className="btn">Add Product</Link></p>
      </section>
      <section>
        {/* <h2>All Products...</h2> */}
        <ul className={styles.list}>
          {!products.length && <li>Loading...</li>}
          {products.map(product => {
            // <li>Hi</li>
            return <ProductItem key={product._id} product={product} />
          })}
        </ul>
      </section>
    </div>
  );
};

export default ProductsAll;