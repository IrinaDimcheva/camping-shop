import styles from '../../pages/Login.module.css';

const ProductNew = () => {
  return (
    <div className={styles.container}>
      <h1>Add new Product</h1>
      <form action="">
        <p>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </p>
        <p>
          <label htmlFor="image">ImageUrl</label>
          <input type="text" name="image" id="image" />
          <img src="" alt="" />
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
          <textarea name="description" id="description" rows="7" minLength={10} maxLength={2000}></textarea>
        </p>
        <p>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" min={0} />
        </p>
        <button type="reset" className="btn btn-alt">Reset</button>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ProductNew;