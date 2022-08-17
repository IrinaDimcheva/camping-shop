import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getCart } from '../../services/user-service';
import { createOrder } from '../../services/order-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './ProductNew.module.css';

const OrderForm = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched' || 'onBlur'
  });

  useEffect(() => {
    getCart().then(products => {
      products = products.map(p => p = { amount: p.amount, productId: p.productId._id, price: p.productId.price });
      console.log(products);
      setCart(products);
    }).catch(err => {
      console.log(err);
      setError(err.message);
    });
  }, []);

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    const orderData = { data, cart }
    console.log(data, cart);
    createOrder({ data, cart }).then(order => {
      setIsLoading(false);
      console.log(order);
      // navigate('/profile');
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
      console.log(err);
    });
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner asOverlay />}

      <h1>Customer Details</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name..."
            {...register('firstName', {
              required: 'First Name is required.',
              // minLength: {
              //   value: 3,
              //   message: 'First Name should be at least 3 characters.'
              // },
              // maxLength: {
              //   value: 15,
              //   message: 'First Name should not be longer than 15 characters.'
              // }
            })}
          />
        </p>
        <p className={styles.error}>{errors.firstName?.message}</p>
        <p>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name..."
            {...register('lastName', {
              required: 'Last Name is required.',
              // minLength: {
              //   value: 3,
              //   message: 'Last Name should be at least 3 characters.'
              // },
              // maxLength: {
              //   value: 15,
              //   message: 'Last Name should not be longer than 15 characters.'
              // }
            })}
          />
        </p>
        <p className={styles.error}>{errors.lastName?.message}</p>
        <hr />
        <p>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            placeholder='Street...'
            {...register('street', {
              required: 'Street is required.'
            })}
          />
        </p>
        <p className={styles.error}>{errors.street?.message}</p>
        <p>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            name="postal"
            id="postal"
            placeholder='Postal Code...'
            {...register('postal', {
              required: 'Postal code is required.',
              pattern: {
                value: /^[0-9]{4}$/,
                message: "Postal code should contains only digits, 4 symbols long."
              }
            })}
          />
        </p>
        <p className={styles.error}>{errors.postal?.message}</p>
        <p>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder='City...'
            {...register('city', {
              required: 'City is required.'
            })}
          />
        </p>
        <p className={styles.error}>{errors.city?.message}</p>
        <p>Check your data and hit submit button to order the products.</p>
        {!isLoading && (
          <button className="btn btn-primary">Submit</button>
        )}
        {!!error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default OrderForm;