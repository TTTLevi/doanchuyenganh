import Parcel from '../assets/images/parcel_icon.png';
import { useEffect, useState } from 'react';
import Model from '../components/Model';
import OrderDetail from './UserOrderDetail';
import { apiFindProductById, apiGetOrderById } from '../apis/apiOrder';
import useUserStore from '../zustand/useUserStore';
import { formatDateTime } from '../utils/helper';

const MyOrders = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [productOfOrder, setProductOfOrder] = useState([]);
  const { me } = useUserStore();

  const fetchOrderDetails = async (productOrders) => {
    try {
      const products = await Promise.all(
        productOrders.map((orderItem) =>
          apiFindProductById(orderItem.productId).then((res) => ({
            ...res.data,
            quantity: orderItem.quantity,
          }))
        )
      );
      console.log(products);
      setProductOfOrder(products);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleViewDetail = async (productOrders) => {
    await fetchOrderDetails(productOrders);
    setIsModelOpen(true);
  };

  const fetchOrders = async () => {
    try {
      const response = await apiGetOrderById(me.id);
      if (response?.data) {
        setOrders(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatus = (a) => {
    if (a == 'handling')
      return 'Đang xử lý';
    else if (a == 'delivering')
      return 'Đang giao hàng';
    else if (a == 'delivered')
      return 'Đã giao';
    else return 'Đã hủy'
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-11 min-h-[360px]">
      <div className="border-t pt-5">
        <p className="text-2xl font-bold text-orange-500 mb-4">Các đơn hàng của tôi</p>
        <div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-b text-gray-700"
              >
                <div className="flex items-center">
                  <img src={Parcel} className="w-10 h-10" alt="Parcel icon" />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Mã đơn hàng:</span>
                  <span>{order.code}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Ngày đặt:</span>
                  {/* <span>{order.createTime}</span> */}
                  <span>{formatDateTime(order.createTime)}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Trạng thái:</span>
                  {/* <span>{order.status}</span> */}
                  <span>{handleStatus(order.status)}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Tổng tiền:</span>
                  <span>{order.total}</span>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-blue-500"
                    onClick={() => handleViewDetail(order.productOrders)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          )}
        </div>
      </div>
      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        <OrderDetail listProduct={productOfOrder} />
      </Model>
    </div>
  );
};

export default MyOrders;