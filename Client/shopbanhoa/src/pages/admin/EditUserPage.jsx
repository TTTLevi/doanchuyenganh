import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/admin/common/Header"
import { apiBlockUser, apiGetUser } from "../../apis/apiUse"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const EditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    role: "",
    status: true,
  })

  const [status, setStatus] = useState(true)

  const handleGetUser = async () => {
    const response = await apiGetUser(id)

    setUser({
      fullName: response.data.fullName,
      email: response.data.email,
      role: response.data.role_id,
      status: response.data.status,
    })
    setStatus(response.data.status)
  }

  useEffect(() => {
    handleGetUser()
  }, [])

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: "",
    status: "active",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleBlockUser = async () => {
    const res = await apiBlockUser(id, status)
    console.log(res.status)
    if (res.status === 200) {
      toast.success("Update status thành công")
      navigate("/admin/users")
      console.log(res.data)
    } else {
      toast.error("Update status thất bại")
    }
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Edit User" />
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-11">
        <h2 className="text-2xl font-bold mb-6">Chỉnh sửa tài khoản</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
              Họ tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={user.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
              Vai trò
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={user.role == 1 ? "Admin" : "User"}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={() => setStatus(!status)}
              className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="true">Active</option>
              <option value="false">Disable</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="text"
              className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBlockUser}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
