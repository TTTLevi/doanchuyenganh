import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ProductItem from "../components/ProductItem"
import { Categories } from "../utils/mockData"
import CategoryDescription from "../components/CategoryDescription"
import NavBar2 from "../components/NavBar2" 
import { apiGetCategoryByCode } from "../apis/apiCategory"

const CategoryPage = () => {
  const { category } = useParams()
  const [showMore, setShowMore] = useState(false)
  const [products, setProducts] = useState([])
  
  // Thêm useEffect để cập nhật products khi category thay đổi

  const handleGetProductByCate  = async () => {
    const res = await apiGetCategoryByCode(category)
    console.log(res);
    setProducts(res.data)
  }
  useEffect(() => {
    handleGetProductByCate()
    // const categoryProducts = listData.filter(product => product.category === category)
    
  }, [category]) // Dependency là category

  const categoryTitle = Categories.find(cat => cat.slug === category)?.name

  const handleSort = (e) => {
    let sortedProducts = [...products]
    if (e.target.value === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (e.target.value === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price)
    }
    setProducts(sortedProducts)
  }

  if (!categoryTitle) return <div>Category not found</div>

  return (
    <div>
      <div>
        <NavBar2 />
      </div>
      <div className="container mx-auto px-4 md:px-16 lg:px-20 py-4">
        <div>
          <div className="container mx-auto px-4 py-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-600">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-green-600">{categoryTitle}</span>
          </div>
        </div>

        <div className="flex-1 border border-gray-300 rounded-md">
          {/* Sort */}
          <div className="flex items-center justify-end p-11">
            <select 
              className="border-2 border-gray-300 text-sm p-2"
              onChange={handleSort}
            >
              <option value="relevane">Sắp xếp</option>
              <option value="low-high">Giá thấp đến cao</option>
              <option value="high-low">Giá cao đến thấp</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="px-11 pb-11">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="my-11 border border-gray-300 rounded-md">
          <div className="p-7 space-y-4">
            <div className={`space-y-4 ${!showMore ? 'line-clamp-2' : ''}`}>
              <CategoryDescription category={category} />
            </div>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {showMore ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
