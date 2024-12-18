import { motion } from 'framer-motion'
import { UsersIcon, UserCheck } from 'lucide-react'
import { useState } from 'react'

import Header from '../../components/admin/common/Header'
import StatCard from '../../components/admin/common/StatCard'
import UsersTable from '../../components/admin/users/UsersTable'
import { apiGetAllUser } from "../../apis/apiUse.js"
import { useEffect } from 'react'

const UsersPage = () => {
	const [userCount, setUserCount] = useState()
	const [userDisableCount, setUserDisableCount] = useState()

	const fetchUser = async () => {
    try {
      const response = await apiGetAllUser();
      const users = response.data
      const userDisCount = users.filter(user => user.status == false).length;
      setUserDisableCount(userDisCount)
			setUserCount(users.length)
    } catch (error) {
      console.error("Error fetching orders", error);
      return [];
    }
  }

	useEffect(()=>{
		fetchUser()
	},[])


  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Users' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Số Accounts' icon={UsersIcon} value={userCount} color='#6366F1' />
					<StatCard name='Sô Accounts đã bị khóa' icon={UserCheck} value={userDisableCount} color='#F59E0B' />
				</motion.div>

        {/* UserTABLE */}
        <UsersTable />
      </main>
    </div>
  )
}

export default UsersPage