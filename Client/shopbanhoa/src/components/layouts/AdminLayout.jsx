import Sidebar from "../admin/Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#DDF2D1] text-black overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A8C5] to-[#FFFF7E]"/>
        <div className="absolute inset-0 backdrop-blur-sm"/>
      </div>

      <Sidebar/>
      
      <Outlet/>
    </div>
  )
}

export default AdminLayout