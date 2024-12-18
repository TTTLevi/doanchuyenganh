import PropTypes from "prop-types"
import useUserStore from "../../../zustand/useUserStore"
import { LogOut } from "lucide-react"
import { getLastName } from "../../../utils/helper"

const Header = ({title}) => {
  const {me, logout} = useUserStore()
  
  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
        <h3 className='text-xl font-semibold text-gray-100'>{title}</h3>
        {
          me && (
            <div className="flex items-center space-x-2">
              <p className="text-gray-100">Xin chào: {getLastName(me.username.toUpperCase())}</p>
              <span onClick={handleLogout} style={{cursor: 'pointer'}}><LogOut size={20} style={{color: "red"}}/></span>
            </div>
          )
        }
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
