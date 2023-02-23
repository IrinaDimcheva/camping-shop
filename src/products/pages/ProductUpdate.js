import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getProductById, updateProduct } from '../../services/product-service';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import styles from './ProductNew.module.css';

const ProductEdit = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onTouched' || 'onBlur'
  });

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId).then(data => {
      setProduct(data);
      reset(data);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  }, [productId, reset]);

  const onSubmitHandler = (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!isAdmin) {
      alert('You are unauthorized to perform this action!');
      return;
    }
    updateProduct(productId, data)
      .then(() => {
        setIsLoading(false);
        navigate(`/products/${productId}`);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner asOverlay />}
      <h1>Edit Product</h1>
      {isAdmin && product && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name..."
              {...register('name', {
                required: 'Product Name is required',
                minLength: {
                  value: 3,
                  message: 'Product Name should be at least 4 characters.'
                },
                maxLength: {
                  value: 150,
                  message: 'Product Name should not be longer than 250 characters.'
                }
              })}
            />
          </p>
          <p className={styles.error}>{errors.name?.message}</p>
          <p>
            <label htmlFor="imageUrl">ImageUrl</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder='https://...'
              {...register('imageUrl', {
                required: 'Image URL is required.',
                pattern: {
                  value: /^https*:\/\/.+/,
                  message: "Image should start with 'http://' or 'https://'."
                }
              })}
            />
            <img src="" alt="" />
          </p>
          <p className={styles.error}>{errors.imageUrl?.message}</p>
          <p>
            <label htmlFor="info">Info</label>
            <input
              type="text"
              name="info"
              id="info"
              placeholder="Info..."
              {...register('info', {
                required: 'Product info is required.',
                minLength: {
                  value: 10,
                  message: "Product info should be at least 10 characters."
                },
                maxLength: {
                  value: 250,
                  message: "Product info should not be longer than 10 characters."
                }
              })}
              maxLength={250}
            />
          </p>
          <p className={styles.error}>{errors.info?.message}</p>
          <p>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              min={0.01}
              step={0.01}
              placeholder='Price...'
              {...register('price', {
                required: 'Product Price is required.',
                validate: (value) => value > 0 || 'Price should be greater than 0.'
              })}
            />
          </p>
          <p className={styles.error}>{errors.price?.message}</p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="7"
              minLength={10}
              maxLength={2000}
              placeholder='Description...'
              {...register('description', {
                required: 'Description is required.',
                minLength: {
                  value: 10,
                  message: 'Description should be at least 10 characters.'
                },
                maxLength: {
                  value: 2000,
                  message: 'Description should not be longer than 2000 characters.'
                }
              })}
            ></textarea>
          </p>
          <p className={styles.error}>{errors.description?.message}</p>
          <p>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={0}
              placeholder='Quantity'
              {...register('quantity', {
                required: 'Quantity is required.',
                validate: (value) => parseInt(value) > 0 || 'Quantity should be greater than 0.'
              })}
            />
          </p>
          <p className={styles.error}>{errors.quantity?.message}</p>
          <p>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" {...register('category')}>
              <option value="campingEquipment">Camping Equipment</option>
              <option value="tents">Tents</option>
              <option value="sleepingBags">Sleeping Bags</option>
              <option value="accessories">Accessories</option>
            </select>
          </p>
          <div className={styles.actions}>
            <Link type="reset" className="btn btn-alt" to={`/products/${productId}`}>Cancel</Link>
            {!isLoading && (
              <button className="btn btn-primary">Save</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductEdit;
