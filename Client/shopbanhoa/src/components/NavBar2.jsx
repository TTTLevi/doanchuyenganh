import { Categories } from "../utils/mockData"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const NavBar2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <div className={`${isSticky ? 'fixed top-0 left-0 right-0' : ''} z-50 bg-white shadow-md transition-transform duration-300`} id="navbar2">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="relative group cursor-pointer container mx-auto px-4 md:px-16 lg:px-20">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-[#00833d] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Danh mục sản phẩm</span>
            </button>

            <div className="absolute left-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                {Categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`block px-4 py-2 text-sm cursor-pointer ${
                      location.pathname === `/${category.slug}`
                        ? "text-[#00833d] bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#00833d]"
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar2