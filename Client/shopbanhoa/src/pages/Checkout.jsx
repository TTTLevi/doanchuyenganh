import { Link } from "react-router-dom";
import useCartStore from "../zustand/useCartStore";
import { useState } from "react";
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

const Checkout = ({setOrder}) => {
  const cart = useCartStore((state) => state.cart);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    district: "",
    ward: "", 
    address: ""
  });
  

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.district) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    if (!formData.ward) {
      newErrors.ward = "Vui lòng chọn phường";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process order
      console.log("Order submitted", formData);
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleOrder = () => {
    const newOrder = {
      ...formData,
      products: cart,
      totalAmount: totalAmount,
      orderDate: new Date().toISOString(),
      orderNumber: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    setOrder(newOrder)
    navigate("/order-confirmation")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
      <h3 className="text-sm mb-11">
        <Link to="/" className="text-orange-500 hover:text-green-600">Trang chủ</Link> /
        <Link to="/cart" className="text-orange-500 hover:text-green-600"> Giỏ hàng</Link> /
        Đặt hàng
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-between gap-4 min-h-[80vh]">
        {/* Left side */}
        <div className="w-full sm:w-2/3 flex flex-col gap-4">
          <div className="border border-gray-300 rounded-md p-7 bg-white">
            <h3 className="text-sm text-green-500 font-semibold mb-4">Thông tin khách hàng</h3>
            <div className="flex gap-7">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium">Họ và tên <span className="text-red-500">*</span></label>
                <input 
                  className={`py-2 px-3.5 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ tên" 
                />
                {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                <input 
                  className={`py-2 px-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-sm font-medium">Số điện thoại <span className="text-red-500">*</span></label>
              <input 
                className={`py-2 px-3.5 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại" 
              />
              {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-7 bg-white">
            <h3 className="text-sm text-green-500 font-semibold mb-4">Địa chỉ nhận hàng</h3>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-sm font-medium">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
              <input className="py-2 px-3.5 border border-gray-300 rounded-md" type="text" placeholder="Tỉnh/Thành phố" value="TP Hồ Chí Minh" disabled />
            </div>
            <div className="flex gap-7">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium mt-3">Quận/Huyện <span className="text-red-500">*</span></label>
                <select 
                  className={`py-2 px-3.5 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 3">Quận 3</option>
                  <option value="Quận 4">Quận 4</option>
                  <option value="Quận 5">Quận 5</option>
                  <option value="Quận 6">Quận 6</option>
                  <option value="Quận 7">Quận 7</option>
                  <option value="Quận 8">Quận 8</option>
                  <option value="Quận 9">Quận 9</option>
                  <option value="Quận 10">Quận 10</option>
                  <option value="Quận 11">Quận 11</option>
                  <option value="Quận 12">Quận 12</option>
                  <option value="Quận Bình Tân">Quận Bình Tân</option>
                  <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                  <option value="Quận Gò Vấp">Quận Gò Vấp</option>
                  <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
                  <option value="Quận Tân Bình">Quận Tân Bình</option>
                  <option value="Quận Tân Phú">Quận Tân Phú</option>
                  <option value="Quận Thủ Đức">Quận Thủ Đức</option>
                  <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
                  <option value="Huyện Cần Giờ">Huyện Cần Giờ</option>
                  <option value="Huyện Củ Chi">Huyện Củ Chi</option>
                  <option value="Huyện Hóc Môn">Huyện Hóc Môn</option>
                  <option value="Huyện Nhà Bè">Huyện Nhà Bè</option>
                </select>
                {errors.district && <span className="text-red-500 text-xs">{errors.district}</span>}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium mt-3">Phường <span className="text-red-500">*</span></label>
                <select 
                  className={`py-2 px-3.5 border ${errors.ward ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Phường</option>
                  <option value="Phường 1">Phường 1</option>
                  <option value="Phường 2">Phường 2</option>
                  <option value="Phường 3">Phường 3</option>
                  <option value="Phường 4">Phường 4</option>
                  <option value="Phường 5">Phường 5</option>
                  <option value="Phường 6">Phường 6</option>
                  <option value="Phường 7">Phường 7</option>
                  <option value="Phường 8">Phường 8</option>
                  <option value="Phường 9">Phường 9</option>
                  <option value="Phường 10">Phường 10</option>
                  <option value="Phường 11">Phường 11</option>
                  <option value="Phường 12">Phường 12</option>
                  <option value="Phường 13">Phường 13</option>
                  <option value="Phường 14">Phường 14</option>
                  <option value="Phường 15">Phường 15</option>
                </select>
                {errors.ward && <span className="text-red-500 text-xs">{errors.ward}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-sm font-medium mt-3">Địa chỉ <span className="text-red-500">*</span></label>
              <input 
                className={`py-2 px-3.5 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ" 
              />
              {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full sm:w-1/3 bg-white p-7 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-sm text-green-500 font-semibold mb-4">Tóm tắt đơn hàng</h3>
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={item?.listImage[0]} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.quantity} x {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex flex-col gap-3 mt-4 ">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tạm tính</span>
              <span className="text-sm font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Phí giao hàng</span>
              <span className="text-sm font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(30000)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tổng tiền</span>
              <span className="text-lg font-medium text-orange-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount + 30000)}</span>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="text-sm text-green-500 font-semibold mb-4">Phương thức đặt hàng</h3>
              <div className="flex gap-3">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="cod" name="payment" value="cash" defaultChecked />
                    <label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium">Thanh toán khi nhận hàng</h4>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" id="momo" name="payment" value="momo" disabled />
                    <label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                      <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png" className="w-6 h-6" alt="" />
                      <div>
                        <h4 className="text-sm font-medium">Thanh toán momo</h4>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm mt-4"
              onClick={handleOrder}
            >Đặt hàng</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout

Checkout.propTypes = {
  setOrder: PropTypes.func.isRequired
}
