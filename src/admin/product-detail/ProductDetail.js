import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/admin-product-service';

import styles from './ProductDetail.module.css';

const ProductsDetail = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { productId } = params;
  console.log(productId);

  useEffect(() => {
    getProductById(productId).then(product => {
      setProduct(product);
      console.log(product.info);
    });
  }, []);

  return (
    <>
      {!product && <p>Loading...</p>}
      {product && (
        <article className={styles.wrapper}>
          <div className={styles.media}>
            <img className={styles.image} src={product?.imageUrl} alt={product?.name} />
          </div>
          <div className={styles.content}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.price.toFixed(2)}BGN</p>
              <p>{product.description}</p>
            </div>
            <div className={styles.cart}>
              <div className={styles.quantity}>
                <h6>Quantity</h6>
                <div className={styles.counter}>
                  <button className={styles.light}>-</button>
                  <span>1</span>
                  <button className={styles.light}>+</button>
                </div>
              </div>
              <button className='btn btn-primary'>ADD TO BAG</button>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Product Information</h3>
            <ul>
              {product.info.map((item, i) => {
                return <li key={i}>{item}</li>
              })}
            </ul>
          </div>
        </article>
      )}
    </>
  );
}

export default ProductsDetail;