import useCartStore from "../zustand/useCartStore"
import emptyCart from "../assets/images/empty-shopping-cart.jpg"
import { FaTrashAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-9 min-h-96 px-4 md:px-16 lg:px-24">
      {cart.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Giỏ hàng</h3>
          <div className="flex flex-col md:flex-row space-x-10 justify-between mt-8">
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_0.5fr] items-center border-b border-gray-300 pb-4 mb-4 text-xs font-bold">
                <p>Sản phẩm</p>
                <p className="text-center">Giá</p>
                <p className="text-center">Số lượng</p>
                <p className="text-center">Tổng</p>
                <p className="text-center"></p>
              </div>
              <div>
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-[2.5fr_1fr_1fr_1fr_0.5fr] items-center border-b border-gray-300 p-4 mb-4"
                  >
                    <div className="flex items-center space-x-7">
                      <img src={product?.listImage[0]} alt={product.name} className="w-20 h-20 object-contain" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{product.name}</h3>
                      </div>
                    </div>
                    <p className="text-center text-sm">{product.price.toFixed(2)} VNĐ</p>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-green-300 rounded-md overflow-hidden">
                        <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="px-1.5 py-1 hover:bg-green-50 border-r border-green-300 transition-colors">-</button>
                        <p className="px-2 text-sm font-medium">{product.quantity}</p>
                        <button onClick={() => updateQuantity(product.id, product.quantity + 1)} className="px-1.5 py-1 hover:bg-green-50 border-l border-green-300 transition-colors">+</button>
                      </div>
                    </div>
                    <p className="text-center text-sm">{(product.price * product.quantity).toFixed(2)} VNĐ</p>
                    <div className="flex justify-center">
                      <button className="hover:text-green-500"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Subtotal */}
            <div className="md:w-1/3 bg-white p-4 rounded-lg border border-green-300 shadow-md">
              <h3 className="text-sm font-semibold mb-5">TỔNG CỘNG</h3>
              <div className="flex justify-between items-center border-b pb-1 mb-5">
                <span>Tổng số lượng</span>
                <span>{cart.reduce((acc, curr) => acc + curr.quantity, 0)} sản phẩm</span>
              </div>
              <div className="flex justify-between items-center pb-1 mb-3">
                <span>Tạm tính</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND' 
                  }).format(cart.reduce((acc, curr) => acc + curr.totalPrice, 0))}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1 mb-3">
                <span>Phí giao hàng tạm tính</span>
                <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}</span>
              </div>
              <div className="flex justify-between items-start pb-1 mb-3 border-b border-gray-300">
                <span>Tổng tiền</span>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-medium text-orange-500">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(cart.reduce((acc, curr) => acc + curr.totalPrice, 0) + 0)}
                  </span>
                  <span className="text-sm text-gray-500">(Đã bao gồm VAT)</span>
                </div>
              </div>
              <div>
              <div className="flex gap-2 mb-3 border-b border-gray-300 pb-3">
                <input 
                  type="text" 
                  placeholder="Nhập mã khuyến mãi" 
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition-colors text-sm">
                  Áp dụng
                </button>
              </div>
              </div>
              <button 
                className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors mt-7"
                onClick={() => navigate("/checkout")}
              >Tiếp tục</button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Tổng tiền: {totalAmount.toLocaleString()}đ
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10 gap-3 min-h-[70vh]">
          <img src={emptyCart} alt="empty-cart" />
          <p className="text-xl font-bold">Không có sản phẩm nào trong giỏ hàng</p>
        </div>
      )}
    </div>
  )
}

export default Cart