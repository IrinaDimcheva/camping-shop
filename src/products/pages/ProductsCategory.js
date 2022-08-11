import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsByCategory } from "../../services/product-service";
import ProductList from "../components/ProductList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


const ProductsCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductsByCategory(category).then(data => {
      console.log(data);
      setProducts(data.products);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  }, []);

  return (
    <div className={`${"centered"} `}>
      {isLoading && <LoadingSpinner />}
      <section>
        {!isLoading && products.length === 0 && (
          <h1>No products for this category!</h1>
        )}
        {!isLoading && products.length !== 0 && (
          <ProductList items={products} />
        )}
      </section>
    </div>
  );
};

export default ProductsCategory;