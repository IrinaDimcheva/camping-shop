import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getCart } from '../../services/user-service';
import { createOrder } from '../../services/order-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './ProductNew.module.css';

const OrderForm = (props) => {
  const [order, setOrder] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched' || 'onBlur'
  });
  let clearId;

  useEffect(() => {
    document.title = props.title;
    getCart().then(products => {
      products = products.map(p => p = {
        amount: p.amount,
        productId: p.productId._id,
        price: p.productId.price,
        name: p.productId.name,
        imageUrl: p.productId.imageUrl
      });
      setOrder(products);
    }).catch(err => {
      setError(err.message);
    });

    return (() => {
      clearTimeout(clearId);
      document.title = '';
    });
  }, [clearId, props.title]);

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsHidden(true);
    createOrder({ data, order }).then((res) => {
      setError(res.message);
      setIsLoading(false);
      clearId = setTimeout(() => {
        setIsHidden(false);
        navigate('/profile');
      }, 1000);
    }).catch(err => {
      setIsHidden(false);
      setIsLoading(false);
      setError(err.message);
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
              required: 'First Name is required.'
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
              required: 'Last Name is required.'
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
                message: 'Postal code should contains only digits, 4 symbols long.'
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
        {!isLoading && !isHidden && (
          <button className="btn btn-primary">Submit</button>
        )}
        {!!error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
