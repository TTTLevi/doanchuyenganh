import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaShoppingCart, FaUser, FaPhone, FaBoxOpen} from "react-icons/fa"
import { useEffect, useState } from "react"
import useCartStore from "../zustand/useCartStore"
import useStore from "../zustand/useStore"
import useUserStore from "../zustand/useUserStore"
import { getLastName } from "../utils/helper"

import { IoIosLogOut } from "react-icons/io"

const NavBar = () => {
  const [search, setSearch] = useState("")
  const cart = useCartStore((state) => state.cart)
  const setSearchTerm = useStore((state) => state.setSearchTerm)
  const navigate = useNavigate()
  const { me, logout } = useUserStore();


  useEffect(() => { }, [cart])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(search)
    navigate('/search-result')
  }

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  const handleOrder = () => {
    navigate('/my-order')
  }

  // Tính tổng số lượng sản phẩm
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-20 py-4 flex justify-between items-center gap-5">
        <div className="text-2xl font-bold">
          <Link to="/">
            <span className="text-orange-500 font-bold text-2xl">Flower</span> Shop
          </Link>
        </div>
        <div className="flex-1 relative mx-4 w-full flex justify-center">
          <form
            onSubmit={handleSearch}
            className="relative hidden sm:block w-full lg:w-[70%]"
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-orange-400" />
          </form>
        </div>
        <div>
          <div className="hidden md:flex items-center">
            <div className="flex items-center text-orange-500 hover:text-orange-600 cursor-pointer">
              <FaPhone className="mr-2 text-3xl" />
            </div>
            <div className="flex flex-col items-end">
              <a href="tel:+84123456789">0788773399</a>
              <span className="text-sm text-gray-600">từ 8:00 - 21:00</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            <div className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-orange-500 text-white aspect-square rounded-full text-[9px]">
              {totalItems}
            </div>
          </Link>
          <div className="group relative">
            <button className="cursor-pointer">
              {
                me ? <p>Xin chào <span className="font-bold">{getLastName(me.username.toUpperCase())}</span></p> : <FaUser className="text-2xl" />
              }
            </button>
            <div className="group-hover:block hidden absolute right-0 dropdown-menu pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                {
                  !me && <>
                    <Link to="/login" className="hover:text-orange-500 cursor-pointer">
                      Đăng nhập
                    </Link>
                    <Link to="/register" className="hover:text-orange-500 cursor-pointer">
                      Đăng ký
                    </Link>
                  </>
                }
                {
                  me && <div>
                    <div className="flex justify-center items-center mb-3 hover:text-orange-500 cursor-pointer">
                      <FaBoxOpen className="text-xl mr-2 text-yellow-500" />
                      <p
                        onClick={handleOrder}
                      >
                        Đơn hàng
                      </p>
                    </div>

                    <div className="flex justify-center items-center hover:text-orange-500 cursor-pointer">
                      <IoIosLogOut className="text-xl mr-2 text-red-500"/>
                      <p
                        onClick={handleLogout}
                      >

                        Đăng xuất
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
