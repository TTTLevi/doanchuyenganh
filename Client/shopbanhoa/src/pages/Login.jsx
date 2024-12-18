import { Link } from 'react-router-dom'
import { useState } from 'react'
import { apiLogin } from '../apis/apiAuth';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import useUserStore from '../zustand/useUserStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setMe } = useUserStore();
  const navigate = useNavigate()

  const onToast = (s) => {
    if (s === "success") {
      toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(s, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password
    }

    const response = await apiLogin(user);

    if (response.status === 200) {
      if (response.data.status === true) {
        setAccessToken(response.data.token);
        setMe({ id:response.data.id, username: response.data.fullname, role: response.data.roleId, status: response.data.status, email: response.data.email });
        if (response.data.roleId === 1) {
          onToast("success");
          navigate("/admin");
        } else {
          onToast("success");
          navigate("/");
        }
      } else {
        onToast("Tài khoản đã bị khóa");
      }
    } else {
      onToast("Tài khoản và mật khẩu không đúng");
    }

    console.log(response);
    console.log(user);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Đăng nhập
          </h2>
          <p className="text-gray-500 text-sm">
            Chào mừng bạn
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
            >
              Đăng nhập
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-500 text-sm">Chưa có tài khoản? </span>
            <Link to="/register" className="text-sm font-medium text-green-600 hover:text-green-500 transition duration-200">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login