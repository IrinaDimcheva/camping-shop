import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/auth-service";

import BackToTop from "../../shared/components/UIElements/BackToTop";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import styles from './Profile.module.css';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProfile().then(userData => {
      setIsLoading(false);
      setData(userData);
      console.log(userData);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!!error && <p>{error}</p>}
      <h1>User Orders</h1>
      {!isLoading && !data && (
        <h3>No orders for this user yet. Look at our <Link to='/products'>products</Link></h3>
      )}
      {!isLoading && data && (
        <ul className={styles.inner}>
          {data.orders.map((order, i) => {
            return <li key={`${order._id}${i}`} className={styles.order}>
              <div className={styles.date}>Created at: {new Date(order.created_at).toLocaleDateString()}</div>
              <h2>Order Status: {order.status}</h2>
              <ul className={styles.inner}>
                {order.products.map((product, i) => {
                  return <li key={`${i}100`} className={styles['order-item']}>
                    <h3>{product.name}</h3>
                    <div className={styles.summary}>
                      <span className={styles.price}>{product.price.toFixed(2)} BGN</span>
                      <span className={styles.amount}>x {product.amount}</span>
                    </div>
                  </li>
                })}
              </ul>
              <div className={styles.total}>
                <span>Total Price</span>
                <span>{order.totalPrice.toFixed(2)} BGN</span>
              </div>
            </li>
          })}
        </ul>
      )}
      <BackToTop />
    </>
  );
};

export default Profile;
