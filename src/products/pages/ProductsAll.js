import { useEffect, useState } from 'react';

import { getProducts } from '../../services/product-service';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './ProductsAll.module.css';
import { useCallback } from 'react';

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(result => {
      setProducts(result.products);
      setIsLoading(false);
      // console.log(result.products)
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={`${"centered"} ${styles.container}`}>
      {isLoading && <LoadingSpinner />}
      <section>
        {!isLoading && products.length && (
          <ProductList items={products} />
        )}
      </section>
    </div>
  );
};

export default ProductsAll;