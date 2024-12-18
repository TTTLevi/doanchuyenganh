import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import NavBar from "../NavBar"

const PublicLayout = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <NavBar />
      <div className="h-full w-full">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default PublicLayout
