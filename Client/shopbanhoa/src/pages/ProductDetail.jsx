import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import RelatedProducts from "../components/RelatedProducts"
import useCartStore from "../zustand/useCartStore"
import { toast } from "react-toastify"
import { apiGetProductPublicById } from "../apis/apiProduct"
import useStore from "../zustand/useStore"
import { useNavigate } from "react-router-dom"
import useUserStore from "../zustand/useUserStore"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product?.listImage[0])
  const listProducts = useStore((state)=>state.listProducts)
  const {me} = useUserStore();


  const addToCart = useCartStore((state) => state.addToCart)

  const getProduct = async() => {
    const response = await apiGetProductPublicById(id)
    console.log("product",response.data)
    console.log("list product",listProducts)
    setProduct(response.data)
  }



  useEffect(() => {
    getProduct();
  }, [id])

  const handleAddCart = () => {
    if(!me){
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng", {
        position: "top-right",
        autoClose: 2000,
      })
      navigate("/login")
    }
    else {
      if (product && quantity > 0) {
        addToCart(product, quantity)
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
          position: "top-right",
          autoClose: 2000,
        })
      }
    }
  }

  return product ? (
    <div className="container mx-auto px-4 md:px-16 lg:px-20 py-10">
      <div className="border-2 border-gray-300 rounded-md pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Dat */}
        <div className="flex flex-col gap-11 sm:gap-12 sm:flex-row">
          {/* Product Image */}
          <div className="flex-1 flex flex-col-reverse sm:flex-row">
            <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between items-center sm:justify-normal sm:w-[18.7%] w-full ml-3 gap-3">
              {product?.listImage?.map((image, index) => (
              <img 
                src={image} 
                alt={image} 
                key={index} 
                className="w-full object-cover cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            ))}
              
            </div>
            <div className="sm:w-[80%] w-full object-cover ml-1">
              <img src={selectedImage||product?.listImage[0]} alt={product.name} className="w-full h-auto" />
            </div>
          </div>

          {/* Product Detail */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-7">
            <h1 className="text-2xl font-medium mt-2">{product.name}</h1>
            <p>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </p>
            <p className="text-orange-500 font-semibold text-[37px]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}/{product.unit}</p>
            <hr className="sm:w-4/5 w-full" />
            <div className="flex items-center gap-2">
              <p className="text-gray-500">Số lượng</p>
              <div className="flex border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <hr className="sm:w-4/5 w-full" />
            <button 
              onClick={handleAddCart}
              className="bg-green-500 text-white px-4 py-3 rounded text-sm active:bg-green-600 w-[50%]"
            >
              Thêm vào giỏ hàng
            </button>
            <hr className="sm:w-4/5 w-full" />
            <div className="flex flex-col gap-2 text-sm text-gray-500 md:flex-row mb-5">
              <div className="flex items-center gap-2">
                <img
                  src="https://shop.dalathasfarm.com/public/dalathasfarm/images/delivery.png"
                  alt=""
                />
                <p>Giao hàng nhanh 2 giờ trong 5km</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://shop.dalathasfarm.com/public/dalathasfarm/images/present-box.png"
                  alt=""
                />
                <p>Miễn phí thiệp chúc mừng</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://shop.dalathasfarm.com/public/dalathasfarm/images/eco-nature.png"
                  alt=""
                />
                <p>Đảm bảo hoa tươi trong 3 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {/* <ProductSection title="Sản phẩm liên quan" products={hoaTangProducts} /> */}
      <RelatedProducts
        products={listProducts?.filter((el) => el.category_id === product.category_id)}
      />
    </div>
  ) : (
    <div>Product not found</div>
  )
}

export default ProductDetail
