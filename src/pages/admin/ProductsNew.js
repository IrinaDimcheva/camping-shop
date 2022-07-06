import styles from '../Login.module.css';

const ProductsNew = () => {
  return (
    <div className={styles.container}>
      <h1>Add new Product</h1>
      <form action="">
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input type="text" name="image" id="image" />
        </p>
        <p>
          <label htmlFor="summary">Summary</label>
          <input type="text" name="summary" id="summary" maxLength={250} />
        </p>
        <p>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" min={0.01} step={0.01} />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows="7"></textarea>
        </p>
        <button type="reset" className="btn btn-alt">Reset</button>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ProductsNew;