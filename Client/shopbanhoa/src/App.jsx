import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect, Suspense, lazy } from "react"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import useStore from "./zustand/useStore"

// import { PublicLayout, AdminLayout } from "./components/layouts"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import CategoryPage from "./pages/CategoryPage"
import Checkout from "./pages/Checkout"
import Order from "./pages/Order"
import FilterData from "./pages/FilterData"
import About from "./pages/About"
import Address from "./pages/Address"
import OverviewPage from "./pages/admin/OverviewPage"
import ProductsPage from "./pages/admin/ProductsPage"
import Category from "./pages/admin/Category"
import UsersPage from "./pages/admin/UsersPage"
import EditUserPage from "./pages/admin/EditUserPage"
import AddEditProductPage from "./pages/admin/AddEditProductPage"
import OrdersPage from "./pages/admin/OrdersPage"
import OrderDetail from "./pages/admin/OrderDetail"
import MyOrders from "./pages/MyOrders"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { apiGetAllProductPublic } from "./apis/apiProduct"
import Loading from "./assets/images/loading.gif"
import Login from "./pages/Login"
import Register from "./pages/Register"

const PublicLayout = lazy(() => import("./components/layouts/PublicLayout"));
const AdminLayout = lazy(() => import("./components/layouts/AdminLayout"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [order, setOrder] = useState(null)
  const setListProducts = useStore((state) => state.setListProducts)
  const handleGetProduct = async () => {
    const res = await apiGetAllProductPublic()
    setListProducts(res.data);
  }


  useEffect(() => {
    handleGetProduct()
  }, [])

  return (
    <Router>

      <ToastContainer />
      <Suspense
        fallback={
          <div className="w-full bg-white h-screen flex items-center justify-center">
            <img
              src={Loading}
              alt="loading..."
              className="w-32 md:w-52"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout setOrder={setOrder} />}></Route>
            <Route path="/order-confirmation" element={<Order order={order} />}></Route>
            <Route path="/search-result" element={<FilterData />}></Route>
            <Route path="/gioi-thieu" element={<About />}></Route>
            <Route path="/shop-flower" element={<Address />}></Route>
            <Route path="/my-order" element={<MyOrders />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
          </Route>
          {/* admin */}
          {/* <ProtectedAdmin isSignedIn={isSignedIn} role={role}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<OverviewPage />} />
            <Route path="/admin/san-pham" element={<ProductsPage />} />
            <Route path="/admin/danh-muc" element={<Category />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/:id" element={<EditUserPage />} />
            <Route path="/admin/add-product" element={<AddEditProductPage />} />
            <Route path="/admin/edit-product/:id" element={<AddEditProductPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/orders/:id" element={<OrderDetail />} />
          </Route>
          {/* </ProtectedAdmin> */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
