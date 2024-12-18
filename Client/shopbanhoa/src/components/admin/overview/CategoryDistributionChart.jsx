import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { apiGetCateChartData } from '../../../apis/apiCategory';

const COLORS = ["#4F46E5", "#A57FF2", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
  const [cateData, setCateData] = useState([])

  const handleGetCateData = async () => {
    const res = await apiGetCateChartData()
    console.log(res.data)
    const formattedData = res.data.map(el => ({

      name: el.name,
      value: el.countProduct,

    }))
    setCateData(formattedData)
  }

  useEffect(() => {
    handleGetCateData()
  }, [])


  return (
    <motion.div
      className='bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0. }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>Phân loại theo danh mục</h2>
      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={cateData}
              cx='50%'
              cy='50%'
              labelLine={true}
              outerRadius={70}
              fill='#8884d8'
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {cateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default CategoryDistributionChart