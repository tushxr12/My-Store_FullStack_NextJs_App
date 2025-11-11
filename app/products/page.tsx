import ProductsList from "../ProductsList";
import { products } from "../product-data";

const ProductsPage = () => {
  return (
    <div>
        <h1>Products</h1>
        <ProductsList products={products} />
    </div>
  )
}

export default ProductsPage
