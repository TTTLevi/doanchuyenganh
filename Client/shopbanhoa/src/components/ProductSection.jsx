import PropTypes from "prop-types"
import ProductItem from "./ProductItem"

const ProductSection = ({ products, title }) => {
  return (
    <div className="mt-4 border-[1px] border-gray-300 rounded-xl">
      <h3 className="text-xl font-bold p-4 text-[#00833d] mt-3">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mb-3">
        {
          products?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductSection


ProductSection.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
}