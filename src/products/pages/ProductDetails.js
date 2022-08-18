import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getProductById, deleteProduct } from '../../services/product-service';
import { addToCart } from '../../services/user-service';
import BackToTop from '../../shared/components/UIElements/BackToTop';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const authCtx = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { productId } = params;

  let clearId;


  useEffect(() => {
    setIsLoading(true);
    getProductById(productId).then(product => {
      setIsLoading(false);
      setProduct(product);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
    return () => {
      clearTimeout(clearId);
    }
  }, [productId, clearId]);

  const deleteHandler = () => {
    setIsLoading(true);
    deleteProduct(productId).then(deletedProduct => {
      setIsLoading(false);
      console.log('HERE: ', deletedProduct);
      navigate('/products');
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    })
  };

  const incrementHandler = () => {
    setAmount(q => q < 5 ? q + 1 : 5);
  };

  const decrementHandler = () => {
    setAmount(q => q > 1 ? q - 1 : 1);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(productId);
    if (!authCtx.userId) { return; }
    addToCart(productId, amount).then(res => {
      console.log(res.message);
      if (!res.ok) {
        setError(res.message);
        return;
      }
    }).catch(err => {
      console.log(err);
      setError(err.message);
    });
    clearId = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const navigateHandler = () => {
    if (!authCtx.isLoggedIn) {
      navigate('/login')
    }
  }

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
                <form onSubmit={submitHandler}>
                  <div className={styles.cart}>
                    <div className={styles.quantity}>
                      <h6 className={styles['quantity-title']}>Quantity</h6>
                      <div className={styles.counter}>
                        <button type='button' className={styles.light} onClick={decrementHandler}>-</button>
                        <input
                          type="number"
                          min='1'
                          max='5'
                          step='1'
                          value={amount}
                          disabled
                        />
                        <button type='button' className={styles.light} onClick={incrementHandler}>+</button>
                      </div>
                    </div>
                    <button className='btn btn-primary' onClick={navigateHandler}>ADD TO CART</button>
                  </div>
                  <p className={styles.message}>{!!error && <span>{error}</span>}</p>
                </form>
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
      <BackToTop />
    </div>
  );
}

export default ProductDetails;