import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductsByCategory } from '../../services/product-service';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import BackToTop from '../../shared/components/UIElements/BackToTop';
import SearchBar from '../../shared/components/SearchBar';


const ProductsCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    document.title = props.title;
    setIsLoading(true);
    getProductsByCategory(category).then(data => {
      setProducts(data.products);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
    return () => document.title = '';
  }, [category, props.title]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <SearchBar placeholder={'Search for products...'} data={products} />
      <section>
        {!isLoading && products.length === 0 && (
          <h1>No products for this category!</h1>
        )}
        {!isLoading && products.length !== 0 && (
          <ProductList items={products} />
        )}
      </section>
      <BackToTop />
    </>
  );
};

export default ProductsCategory;
