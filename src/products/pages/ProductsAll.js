import { useEffect, useState } from 'react';

import { getProducts } from '../../services/product-service';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import BackToTop from '../../shared/components/UIElements/BackToTop';
import SearchBar from '../../shared/components/SearchBar';

const ProductsAll = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = props.title;
    setIsLoading(true);
    getProducts().then(result => {
      setProducts(result.products);
      setIsLoading(false);
    }).catch(err => {
      setError(err.message);
      setIsLoading(false);
    });

    return () => document.title = '';
  }, []);

  return (
    <>
      {/* <div className={styles.container}> */}
      {isLoading && <LoadingSpinner />}
      {!!error && <p>{error}</p>}
      <section>
        {!isLoading && products.length && (
          <>
            <SearchBar placeholder={'Search for products...'} data={products} />
            <ProductList items={products} />
          </>
        )}
      </section>
      {/* </div> */}
      <BackToTop />
    </>
  );
};

export default ProductsAll;