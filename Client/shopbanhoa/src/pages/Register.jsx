import { useState } from "react"
import { apiRegister } from "../apis/apiAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let user = {
        fullName: fullname,
        email,
        password,
      };
      const response = await apiRegister(user);
      console.log(response);

      navigate('/login');
    }
  }

  const validateForm = () => {
    let tempErrors = {};

    if (!fullname) {
      tempErrors.fullname = 'Họ và tên không được để trống';
    }

    if (!email) {
      tempErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email không hợp lệ';
    }

    if (!password) {
      tempErrors.password = 'Mật khẩu không được để trống';
    } else if (password.length < 7) {
      tempErrors.password = 'Mật khẩu phải có ít nhất 7 kí tự';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Đăng ký tài khoản
          </h2>
          <p className="text-gray-500 text-sm">
            Tạo tài khoản mới để tiếp tục
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400`}
                placeholder="Nhập họ tên của bạn"
              />
              {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400`}
                placeholder="Nhập địa chỉ email của bạn"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400`}
                placeholder="Nhập mật khẩu của bạn"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400`}
                placeholder="Nhập lại mật khẩu của bạn"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
          >
            Đăng ký
          </button>

          <div className="text-center">
            <span className="text-gray-500 text-sm">Đã có tài khoản? </span>
            <Link to="/login" className="text-sm font-medium text-green-600 hover:text-green-500 transition duration-200">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register