import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { FaFilter } from "react-icons/fa"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

import Header from "../../components/admin/common/Header"
import Pagination from "../../components/admin/common/Pagination"
import { apiGetAllOrder, apiUpdateOrder } from "../../apis/apiOrder"
import { formatDateTime, formatCurrency } from "../../utils/helper"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)
  const [filter, setFilter] = useState({
    price: "desc",
    fromDate: "",
    toDate: "",
  })
  const [filteredOrders, setFilteredOrders] = useState([])

  const handleGetOrders = async () => {
    const res = await apiGetAllOrder()
    console.log(res.data)
    setOrders(res.data)
    setFilteredOrders(res.data)
  }

  useEffect(() => {
    handleGetOrders()
  }, [])

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  const handleUpdateStatus = async (id, value) => {
    const res = await apiUpdateOrder(id, value)
    console.log(res)
    if (res.status === 200) {
      handleGetOrders()
    }
  }

  // const handleFilter = () => {
  //   let filtered = orders;
  //   if (filter.price === "desc") {
  //     filtered = filtered.sort((a, b) => b.total - a.total);
  //   } else {
  //     filtered = filtered.sort((a, b) => a.total - b.total);
  //   }
  //   if (filter.fromDate) {
  //     filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(filter.fromDate));
  //   }
  //   if (filter.toDate) {
  //     filtered = filtered.filter(order => new Date(order.createdAt) <= new Date(filter.toDate));
  //   }
  //   setFilteredOrders(filtered)
  // }

  const handleFilter = () => {
    let filtered = [...orders];

    if (filter.price === "desc") {
      filtered = filtered.sort((a, b) => b.total - a.total);
    } else if (filter.price === "asc") {
      filtered = filtered.sort((a, b) => a.total - b.total);
    }

    if (filter.fromDate) {
      const fromDate = new Date(filter.fromDate);
      filtered = filtered.filter(order => new Date(order.createTime) >= fromDate);
    }

    if (filter.toDate) {
      const toDate = new Date(filter.toDate);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(order => new Date(order.createTime) <= toDate);
    }

    setFilteredOrders(filtered);
  }



  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title='Đơn hàng' />
      <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700 mt-11 ml-11 mr-11'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className='text-xl font-semibold text-orange-500 mb-4'>Danh sách đơn hàng</h2>
          <div className="flex justify-between mb-4 bg-gray-200 p-3 rounded-lg flex-col sm:flex-row">
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Lọc theo giá:</label>
              <select
                name="price"
                value={filter.price}
                onChange={handleFilterChange}
                className="py-2 pl-3 pr-10 text-sm text-gray-700 border border-gray-300 rounded-lg"
              >
                <option value="desc">Cao đến thấp</option>
                <option value="asc">Thấp đến cao</option>
              </select>
            </div>

            <div className="flex gap-3 mt-3 sm:mt-0">
              <div className="flex items-center">
                <label className="mr-1 text-gray-700">Từ ngày:</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filter.fromDate}
                  onChange={handleFilterChange}
                  className="py-2 pl-3 pr-3 text-sm text-gray-700 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <label className="mr-1 text-gray-700">Đến ngày:</label>
                <input
                  type="date"
                  name="toDate"
                  value={filter.toDate}
                  onChange={handleFilterChange}
                  className="py-2 pl-3 pr-3 text-sm text-gray-700 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                onClick={handleFilter}
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-3 rounded-lg flex items-center justify-center">
                Lọc
                <FaFilter />
              </button>

            </div>
          </div>
          <table className="w-full text-sm text-gray-700 border-collapse bg-white rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">STT</th>
                <th className="px-4 py-2 border-b text-left">Khách hàng</th>
                <th className="px-4 py-2 border-b text-left">Tình trạng</th>
                <th className="px-4 py-2 border-b text-left">Địa chỉ</th>
                <th className="px-4 py-2 border-b text-left">Tổng tiền</th>
                <th className="px-4 py-2 border-b text-left">Ngày tạo</th>
                <th className="px-4 py-2 border-b text-left">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{order.customerName}</td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        handleUpdateStatus(order.id, e.target.value)

                      }}
                      className="py-2 pl-3 pr-10 text-sm text-gray-700 border border-gray-300 rounded-lg"
                    >
                      <option value="handling">Đang xử lý</option>
                      <option value="delivering">Đang giao hàng</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">{order.address}</td>
                  <td className="px-4 py-2 border-b">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-2 border-b">{formatDateTime(order.createTime)}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-1 rounded-lg mr-2"
                    >
                      <Link to={`/admin/orders/${order.id}`} className="inline-block text-green-300 hover:cursor-pointer">
                        <Eye size={21} className="inline-block text-green-300 hover:cursor-pointer" />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={ordersPerPage}
            totalItems={orders.length}
            paginate={paginate}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default OrdersPage
