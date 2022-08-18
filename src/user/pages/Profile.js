import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import styles from './Profile.module.css';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/user/profile', {
      credentials: 'include'
    }).then(res => res.json())
      .then(userData => {
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
          {data.orders.map((order) => {
            return <li key={`${order._id}${order.created_at}`} className={styles.order}>
              <h2>Order Status: {order.status}</h2>
              <div className={styles.inner}>
                {order.products.map(product => {
                  return <div className={styles['order-item']}>
                    <h3>{product.name}</h3>
                    <div className={styles.summary}>
                      <span className={styles.price}>{product.price.toFixed(2)} BGN</span>
                      <span className={styles.amount}>x {product.amount}</span>
                    </div>
                  </div>
                })}
              </div>
              <div className={styles.total}>
                <span>Total Price</span>
                <span>{order.totalPrice.toFixed(2)} BGN</span>
              </div>
            </li>
          })}
        </ul>
      )}
    </>
  );
};

export default Profile;