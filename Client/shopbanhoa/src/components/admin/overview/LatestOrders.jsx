import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { apiGetAllOrder } from "../../../apis/apiOrder"
import { formatDateTime, formatCurrency } from '../../../utils/helper.js';

const LatestOrders = () => {
  const [orders, setOrders] = useState([]);

  const handleGetOrders = async () => {
    try {
      const response = await apiGetAllOrder();
      const sortedOrders = response.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
      
      setOrders(sortedOrders.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching orders", error);
      return [];
    }
  }

  useEffect(() => {
    handleGetOrders()
  }, [])

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700 md:col-span-2'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0. }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>Danh sách đơn hàng mới đặt</h2>

      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead className='bg-gray-200'>
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
        <tbody className='bg-white'>
          {orders.slice(0, 5).map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{order.customerName}</td>
              <td className="px-4 py-2 border-b">
                {order.status === 'handling' && <span className="bg-yellow-500 text-white px-2 py-1 rounded-full">Đang xử lý</span>}
                {order.status === 'delivering' && <span className="bg-blue-500 text-white px-2 py-1 rounded-full">Đang giao hàng</span>}
                {order.status === 'delivered' && <span className="bg-green-500 text-white px-2 py-1 rounded-full">Đã giao</span>}
                {order.status === 'cancelled' && <span className="bg-red-500 text-white px-2 py-1 rounded-full">Đã hủy</span>}
              </td>
              <td className="px-4 py-2 border-b">{order.address}</td>
              <td className="px-4 py-2 border-b">{formatCurrency(order.total)}</td>
              <td className="px-4 py-2 border-b">{formatDateTime(order.createTime)}</td>
              <td className="px-4 py-2 border-b">
                <Link to={`/admin/orders/${order.id}`} className="inline-block text-blue-500 hover:cursor-pointer mr-2">
                  <Eye size={21} className="inline-block text-blue-500 hover:cursor-pointer" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default LatestOrders;
