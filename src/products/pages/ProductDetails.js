import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getProductById, deleteProduct } from '../../services/product-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const authCtx = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const { productId } = params;

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId).then(product => {
      // console.log(product);
      setIsLoading(false);
      setProduct(product);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }, [productId]);

  const deleteHandler = () => {
    setIsLoading(true);
    deleteProduct(productId).then(deletedProduct => {
      setIsLoading(false);
      navigate(-1);
      console.log('HERE: ', deletedProduct);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    })
  };

  const incrementHandler = () => {
    setQuantity(q => q < 5 ? q + 1 : 5);
  };

  const decrementHandler = () => {
    setQuantity(q => q > 1 ? q - 1 : 1);
  };

  return (
    <div className='centered'>
      {isLoading && <LoadingSpinner className='centered' />}
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
                      <button className={styles.light} onClick={decrementHandler}>-</button>
                      <span>{quantity}</span>
                      <button className={styles.light} onClick={incrementHandler}>+</button>
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
              <button className="btn btn-danger" onClick={deleteHandler}>DELETE</button>
            </div>
          )}
        </article>
      )}
    </div>
  );
}

export default ProductDetails;