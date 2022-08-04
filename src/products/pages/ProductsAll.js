import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import ProductItem from "../components/ProductItem";
import styles from './ProductsAll.module.css';
import { getProducts, getProductById } from '../../services/product-service';

const ProductsAll = () => {
  const [products, setProducts] = useState([]);

  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    getProducts().then(result => {
      setProducts(result.products);
      console.log(result.products)
    }).catch(err => console.log(err));
  }, []);
  // method: 'POST',
  // mode: 'cors',
  // credentials: 'include',

  // const detailClickHandler = (product) => {
  //   getProductById(product._id).then(result => {
  //     console.log(result);
  //     return result;
  //   });
  // };

  return (
    <div className={`${"centered"} ${styles.container}`}>
      {/* <h1>Products Administration</h1>
      <section>
        <h2>Manage Products</h2>
        <p><Link to="/admin/products/new" className="btn">Add Product</Link></p>
      </section> */}
      <section>
        {/* <h2>All Products...</h2> */}
        <ul className={styles.list}>
          {!products.length && <li>Loading...</li>}
          {products.map(product => {
            // return <ProductItem key={product._id} product={product} onClick={detailClickHandler} />
            return <ProductItem key={product._id} {...product} />
          })}
        </ul>
      </section>
    </div>
  );
};

export default ProductsAll;