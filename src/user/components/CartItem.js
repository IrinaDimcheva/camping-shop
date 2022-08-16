import styles from './CartItem.module.css';

const CartItem = props => {
  console.log(props)
  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{props.price.toFixed(2)} BGN</span>
          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => props.onRemove(props._id)}>X</button>
      </div>
    </li>
  )
};

export default CartItem;