import { ClipboardList, ShoppingBag, Users, Zap } from "lucide-react"
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Header from "../../components/admin/common/Header"
import StatCard from "../../components/admin/common/StatCard"
import SalesOverviewChart from '../../components/admin/overview/SalesOverviewChart'
import CategoryDistributionChart from '../../components/admin/overview/CategoryDistributionChart'
import LatestOrders from '../../components/admin/overview/LatestOrders'
import useUserStore from "../../zustand/useUserStore"
import { apiGetAllOrder } from "../../apis/apiOrder.js"
import { apiGetAllProduct } from "../../apis/apiProduct.js"
import { apiGetAllUser } from "../../apis/apiUse.js"
import { formatCurrency } from "../../utils/helper.js";

const OverviewPage = () => {
  const [orders, setOrders] = useState([])
  const [productNum, setProductsNum] = useState()
  const [userCount, setUserCount] = useState()

  const fetchOrder = async () => {
    try {
      const response = await apiGetAllOrder();
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders", error);
      return [];
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await apiGetAllProduct();
      setProductsNum(response.data.length)
    } catch (error) {
      console.error("Error fetching orders", error);
      return [];
    }
  }

  const fetchUser = async () => {
    try {
      const response = await apiGetAllUser();
      const users = response.data
      const userRoleCount = users.filter(user => user.role_id == 2).length;
      setUserCount(userRoleCount)
    } catch (error) {
      console.error("Error fetching orders", error);
      return [];
    }
  }

  const calculateTotalRevenue = (orders) => {
  return orders.reduce((acc, order) => acc + order.total, 0);
  };

  const {me} = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if(!me) navigate('/login')
    if(me?.role === 2) navigate('/')
  }, [me])

  useEffect(()=>{
    fetchOrder()
    fetchProduct()
    fetchUser()
  },[])
  
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title='Tổng quan'/>
      
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-4 md:grid-col-4 mb-7"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1}}
          >
            <StatCard
              name="Tổng doanh thu" icon={Zap} value={formatCurrency(calculateTotalRevenue(orders))} color='#6366F1'
            />
            <StatCard
              name="Số người dùng" icon={Users} value={userCount} color='#8b5cf6'
            />
            <StatCard
              name="Số đơn hàng" icon={ClipboardList} value={orders.length} color='#ec4899'
            />
            <StatCard
              name="Tổng sản phẩm" icon={ShoppingBag} value={productNum} color='#10b981'
            />
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <SalesOverviewChart/>
            <CategoryDistributionChart/>
            <LatestOrders/>
          </div>
        </main>
    </div>
  )
}

export default OverviewPage