import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-white border-t-[1px] border-gray-300 mt-10 shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 md:px-16 lg:px-20 py-4 flex justify-between items-center gap-5">
        <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-11 text-sm">
          <div>
            <div className="text-2xl font-bold">
              <Link to="/">
                <span className="text-orange-500 font-bold text-2xl">Flower</span> Shop
              </Link>
            </div>
            <p className="text-gray-600 mt-4">
              Một cửa hàng chuyên cung cấp các loại hoa tươi đẹp, đa dạng từ hoa lãng mạn, hoa chúc
              mừng đến các loại hoa trang trí cho không gian sống. Với sứ mệnh mang đến vẻ đẹp tự
              nhiên và sự tươi mới, cửa hàng cam kết cung cấp những sản phẩm hoa chất lượng, được
              chọn lọc kỹ lưỡng từ các nông trại uy tín.
            </p>
            <p className="text-gray-600">
              {" "}
              <span className="font-bold">- Địa chỉ: </span> 450 Nguyên Tử Lực, P.8, Đà Lạt, Lâm
              Đồng, Việt Nam
            </p>
          </div>
          <div>
            <p className="text-lg font-bold">THÔNG TIN</p>
            <ul className="mt-4 flex flex-col gap-1 text-gray-600">
              <li className="hover:text-[#0a8743]">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="hover:text-[#0a8743]">
                <Link to="/gioi-thieu">Giới thiệu Flower Shop</Link>
              </li>
              <li className="hover:text-[#0a8743]">
                <Link to="/shop-flower">Shop flower</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">LIÊN HỆ</p>
            <ul className="mt-4 flex flex-col gap-1 text-gray-600">
              <li>0788773399</li>
              <li>contact@flowershop.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-gray-600 py-4">
          Copyright 2024@Flower Shop - All right reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
