import styles from './FavoriteItem.css';

const FavoriteItem = (props) => {
  return (
    <li className={styles['item']}>
      <div>
        <img src={props.imageUrl} alt={props.name} />
      </div>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{props.price.toFixed(2)} BGN</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => props.onRemove(props._id)}>X</button>
      </div>
    </li>
  );
};

export default FavoriteItem;