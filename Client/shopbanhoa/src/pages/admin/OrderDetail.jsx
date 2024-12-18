import { motion } from 'framer-motion'
import Header from '../../components/admin/common/Header'
import { useParams } from "react-router-dom";
import { apiGetDetailOrder } from '../../apis/apiOrder';
import { useEffect, useState } from 'react';
import { formatDateTime, formatCurrency } from '../../utils/helper';

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState({})

  const handleGetDetailOrder = async () => {
    const res = await apiGetDetailOrder(id);
    console.log(res.data.productOrders)
    setOrder(res.data)
  }

  useEffect(() => {
    handleGetDetailOrder()
  }, [])

  const handleStatus = () => {
    if (order.status == 'handling')
      return 'Đang xử lý';
    else if (order.status == 'delivering')
      return 'Đang giao hàng';
    else if (order.status == 'delivered')
      return 'Đã giao';
    else return 'Đã hủy'
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title='Chi tiết đơn hàng' />
      <motion.div
        className='bg-white shadow-lg rounded-xl p-5 border border-gray-200 mt-11 mx-11'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className='flex sm:flex-col gap-5 sm:gap-7'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='border-[2px] p-3 min-w-[350px]'>
              <p className='text-lg font-semibold text-green-700'>Mã hóa đơn</p>
              <p>{order.code}</p>
            </div>

            <div className='border-[2px] p-3 min-w-[350px]'>
              <p className='text-lg font-semibold text-green-700'>Khách hàng</p>
              <p>{order.customer_name}</p>
            </div>

            <div className='border-[2px] p-3 min-w-[350px]'>
              <p className='text-lg font-semibold text-green-700'>Ngày tạo</p>
              <p>{formatDateTime(order.createdTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-between'>
            <div className='border-[2px] p-3 min-w-[350px]'>
              <p className='text-lg font-semibold text-green-700'>Địa chỉ</p>
              <p>{order.address}</p>
            </div>

            <div className='border-[2px] p-3 min-w-[350px] '>
              <p className='text-lg font-semibold text-green-700'>Phương thức thanh toán</p>
              <p>{order.payment_method == 'COD' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}</p>
            </div>

            <div className='border-[2px] p-3 min-w-[350px] '>
              <p className='text-lg font-semibold text-green-700'>Tình trạng</p>
              <p>{handleStatus()}</p>
            </div>
          </div>

          <div className='flex w-full justify-center px-3 border-[2px]'>
            <table className='w-full text-sm text-gray-700 border-collapse'>
              <thead className='bg-yellow-200'>
                <tr>
                  <th className='px-4 py-2 border-b text-left'>STT</th>
                  <th className='px-4 py-2 border-b text-left'>Tên sản phẩm</th>
                  <th className='px-4 py-2 border-b text-left'>Số lượng</th>
                  <th className='px-4 py-2 border-b text-left'>Đơn giá</th>
                  <th className='px-4 py-2 border-b text-left'>Thành tiền</th>
                </tr>
              </thead>
              <tbody className='flex-1'>
                {order?.productOrders?.map((el,index) => {
                  return <tr key={index}>
                    <td className='px-4 py-2 border-b'>{index + 1}</td>
                    <td className='px-4 py-2 border-b'>{el.product_name}</td>
                    <td className='px-4 py-2 border-b'>{el.quantity}</td>
                    <td className='px-4 py-2 border-b'>{formatCurrency(el.product_price)}</td>
                    <td className='px-4 py-2 border-b'>{formatCurrency(el.total_price)}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>

          <div className='flex flex-col md:flex-row justify-end'>

            <div className=''>
              <p className='text-xl font-semibold text-red-500'>Tổng tiền</p>
              <p className='flex justify-end text-[27px]'>{formatCurrency(order.total)}</p>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default OrderDetail