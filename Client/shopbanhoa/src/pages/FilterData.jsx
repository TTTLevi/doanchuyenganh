import ProductSection from "../components/ProductSection"
import useStore from "../zustand/useStore"
import NotFound from "../assets/images/no-product-found.jpg"

const FilterData = () => {
  
  const filteredProducts = useStore((state) => state.filteredProducts)
  console.log(filteredProducts)

  


  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-11">
      {filteredProducts?.length > 0 ? (
        <ProductSection products={filteredProducts} title="Kết quả tìm kiếm" />
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
          <img src={NotFound} alt="Not Found" className="w-1/2 mx-auto" />
        </div>
      )}
    </div>
  )
}

export default FilterData