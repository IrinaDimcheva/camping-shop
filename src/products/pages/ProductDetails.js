import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getProductById } from '../../services/product-service';
import AuthContext from '../../shared/context/auth-context';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const authCtx = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    getProductById(productId).then(product => {
      console.log(product);
      setProduct(product);
    });
  }, [productId]);

  return (
    <>
      {!product && <p>Loading...</p>}
      {product && (
        <article>
          <div className={styles.wrapper}>
            <div className={styles.media}>
              <img className={styles.image} src={product?.imageUrl} alt={product?.name} />
            </div>
            <div className={styles.content}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.price?.toFixed(2)}BGN</p>
                <p>{product.description}</p>
              </div>
              {!authCtx.isAdmin && (
                <div className={styles.cart}>
                  <div className={styles.quantity}>
                    <h6 className={styles['quantity-title']}>Quantity</h6>
                    <div className={styles.counter}>
                      <button className={styles.light}>-</button>
                      <span>1</span>
                      <button className={styles.light}>+</button>
                    </div>
                  </div>
                  <button className='btn btn-primary'>ADD TO CART</button>
                </div>
              )}
            </div>
            <div className={styles.info}>
              <h3>Product Information</h3>
              <ul className={styles['info-list']}>
                {product.info?.map((item, i) => {
                  return <li className={styles['info-item']} key={i}>{item}</li>
                })}
              </ul>
            </div>
          </div>
          {authCtx.isAdmin && (
            <div className={styles['admin-actions']}>
              <Link className={`btn btn-primary ${styles.margin}`} to={`/products/${productId}/edit`}>EDIT</Link>
              <button className="btn btn-danger">DELETE</button>
            </div>
          )}
        </article>
      )}
    </>
  );
}

export default ProductDetails;