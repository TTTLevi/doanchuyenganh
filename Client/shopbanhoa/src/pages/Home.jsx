
import { FaListUl } from "react-icons/fa"
import Carousel from "../components/Carousel"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import InfoSection from "../components/InfoSection"
import ProductSection from "../components/ProductSection"
import {  apiGetAllCategoryPublic } from "../apis/apiCategory"
import {apiGetAllProductPublic } from "../apis/apiProduct"



const Home = () => {
  const [showCategories, setShowCategories] = useState(false)

  const [categories, setCategories] = useState([]);
  const [product,setProduct] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetAllCategoryPublic();
      console.log(response.data);
      setCategories(response.data);
    };
    fetchCategories();

    const fetchProduct = async () => {
      const response = await apiGetAllProductPublic();
      console.log(response.data);
      setProduct(response.data);
    };
    fetchProduct();

  }, [])

  return (
    <div className="bg-white mt-3 px-4 md:px-16 lg:px-20">
      <div className="container mx-auto py-4 flex flex-col md:flex-row gap-4 md:gap-7">
        <div className="w-full md:w-3/12">
          <div
            onClick={() => setShowCategories(!showCategories)}
            className="pl-4 flex items-center justify-between gap-2 bg-green-600 text-white p-2 font-bold rounded-tl-xl rounded-tr-xl cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FaListUl />
              <p>DANH MỤC</p>
            </div>
            <div
              className={`md:hidden transition-transform duration-300 ${
                showCategories ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <ul
            className={`space-y-4 bg-gray-100 p-4 border-[1px] border-gray-300 rounded-bl-xl rounded-br-xl ${
              !showCategories ? "hidden md:block" : "block"
            }`}
          >
            {categories.map((category, index) => (
              <li key={index} className="border-b-[1px] hover:cursor-pointer hover:text-green-600">
                <Link to={`/${category.code}`} className="flex items-center gap-2">
                  <span>🌸</span>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-9/12 md:mt-0 h-96">
          {/* Carousel component with state management */}
          <Carousel />
        </div>
      </div>

      <div>
        <InfoSection />
      </div>

      {categories.map((el) => (
        <ProductSection
          key={el.code}
          title={el.name}
          products={product.filter((p) => p.category_id === el.id)}
        />
      ))}
    </div>
  )
}

export default Home
