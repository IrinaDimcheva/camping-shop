const { Link } = require("react-router-dom");

const ProductsAll = () => {
  return (
    <div className="centered">
      <h1>Products Administration</h1>
      <section>
        <h2>Manage Products</h2>
        <p><Link to="/admin/products/new">Add Product</Link></p>
      </section>
      <section>
        <h2>All Products...</h2>
      </section>
    </div>
  );
};

export default ProductsAll;