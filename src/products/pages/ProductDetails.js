import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getProfile } from '../../services/auth-service';
import { getProductById, deleteProduct } from '../../services/product-service';
import { addToCart, addToFavorites, removeFromFavorites } from '../../services/user-service';
import BackToTop from '../../shared/components/UIElements/BackToTop';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const authCtx = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inFavorites, setInFavorites] = useState();
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
      setIsLoading(false);
      setError(err.message);
    });

    return () => clearTimeout(clearId);
  }, [productId, clearId, inFavorites]);

  useEffect(() => {
    getProfile().then(user => {
      setInFavorites(!!user?.favorites?.filter(p => p._id === productId).length);
    })
  }, [productId]);

  const favoritesHandler = () => {
    if (!authCtx.isLoggedIn) { navigate('/login'); }
    if (inFavorites) {
      removeFromFavorites({ productId }).then(() => setInFavorites(false)).catch(err => setError(err.message));
      return;
    }
    addToFavorites({ productId }).then(() => setInFavorites(!!productId)).catch(err => setError(err.message));
  };

  const deleteHandler = () => {
    setIsLoading(true);
    deleteProduct(productId).then(() => {
      setIsLoading(false);
      navigate('/products');
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  };

  const incrementHandler = () => setAmount(q => q < 5 ? q + 1 : 5);
  const decrementHandler = () => setAmount(q => q > 1 ? q - 1 : 1);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!authCtx.userId) { navigate('/login'); }
    addToCart(productId, amount).then(res => {
      if (!res.ok) {
        setError(res.message);
        return;
      }
    }).catch(err => setError(err.message));

    clearId = setTimeout(() => { setError(null); }, 3000);
  };

  const backHandler = () => {
    navigate(-1);
  }

  return (
    <div className='centered'>
      {isLoading && <LoadingSpinner className='centered' />}
      {product && inFavorites !== null && (
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
                  <form onSubmit={submitHandler}>
                    <div className={styles['cart-inner']}>
                      <div className={styles.quantity}>
                        <h6 className={styles['quantity-title']}>Quantity</h6>
                        <div className={styles.counter}>
                          <button type='button' className={styles.light} onClick={decrementHandler}>-</button>
                          <input type="number" min='1' max='5' step='1' value={amount} disabled />
                          <button type='button' className={styles.light} onClick={incrementHandler}>+</button>
                        </div>
                      </div>
                      <button className='btn btn-primary'>ADD TO CART</button>
                    </div>
                  </form>
                  <button className='btn-link' type='submit' onClick={favoritesHandler}>
                    <i className="fa-solid fa-heart"></i>
                    {inFavorites ? ' Remove from favorites' : ' Add to Favorites'}
                  </button>
                  <p className={styles.message}>{!!error && <span>{error}</span>}</p>
                </div>
              )}
            </div>
            <div className={styles.info}>
              <h3>Product Information</h3>
              <ul className={styles['info-list']}>
                {product.info?.map((item, i) => <li className={styles['info-item']} key={i}>{item}</li>)}
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
      {product && inFavorites !== null && !authCtx.isAdmin && (
        <button className='btn btn-primary' onClick={backHandler}>BACK</button>
      )}
      <BackToTop />
    </div>
  );
}

export default ProductDetails;