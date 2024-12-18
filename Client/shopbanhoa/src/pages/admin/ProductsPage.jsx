import Header from "../../components/admin/common/Header"
import ProductTable from "../../components/admin/products/ProductTable"

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title='Sản phẩm'/>

      <ProductTable/>
    </div>
  )
}

export default ProductsPage