
import PropTypes from "prop-types";
import ProductSection from "./ProductSection";

const RelatedProducts = ({products}) => {

  return (
    <ProductSection products={products} title="Sản phẩm liên quan" />
  )
}

export default RelatedProducts

RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired
}

