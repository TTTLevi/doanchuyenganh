import { useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Pagination from '../common/Pagination';
import { apiGetAllProduct, apiDeleteProduct } from '../../../apis/apiProduct';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../../utils/helper';

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    category: '',
    price: '',
  });
  const [appliedFilter, setAppliedFilter] = useState({
    name: '',
    category: '',
    price: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleFilterClick = () => {
    setAppliedFilter(filter);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const filterProductByPrice = (price, filterPrice) => {
    const numericPrice = parseFloat(price);
    switch (filterPrice) {
      case '< 300000':
        return numericPrice < 300000;
      case '300000 - 800000':
        return numericPrice >= 300000 && numericPrice <= 800000;
      case '800000 - 1500000':
        return numericPrice >= 800000 && numericPrice <= 1500000;
      case '> 1500000':
        return numericPrice > 1500000;
      default:
        return true;
    }
  };

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(appliedFilter.name.toLowerCase()) &&
      product.category_name.toLowerCase().includes(appliedFilter.category.toLowerCase()) &&
      (appliedFilter.price === '' || filterProductByPrice(product.price, appliedFilter.price))
    );
  });

  const handleDeleteProduct = async (id) => {
    const response = await apiDeleteProduct(id);
    if (response.status === 200) {
      toast.success(response.data);
      fetchProducts();
    }
  }

  const fetchProducts = async () => {
    const response = await apiGetAllProduct();
    setProducts(response.data);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div
      className="flex flex-col mt-10 mx-4 md:space-x-4 md:flex-row space-y-5 md:space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="w-full lg:w-2/3 shadow-lg rounded-lg overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-md p-3">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Danh sách sản phẩm</h2>
          <div className="flex justify-between items-center">
            <div className="bg-white rounded-full w-9 h-9 flex justify-center items-center hover:bg-orange-100">
              <button
                onClick={() => navigate('/admin/add-product')}
                className="text-3xl text-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[410px]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Hình</th>
                <th scope="col" className="px-6 py-3">Tên</th>
                <th scope="col" className="px-6 py-3">Loại</th>
                <th scope="col" className="px-6 py-3">Giá</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map(product => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={product?.listImage[0]} alt={product.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category_name}</td>
                  <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4">
                    <Edit
                      size={21}
                      className="inline-block mr-2 text-blue-500 hover:cursor-pointer"
                      onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                    />
                    <Trash
                      size={21}
                      className="inline-block text-red-500 hover:cursor-pointer"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={filteredProducts.length}
          paginate={paginate}
        />
      </div>

      <div className="w-full lg:w-1/3 shadow-lg rounded-lg overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-md p-3 flex flex-col">
        <div className="bg-white rounded-lg p-4 flex flex-col gap-6 w-full">
          <div className="flex items-center pb-4 border-b border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <p>Tìm kiếm sản phẩm</p>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              placeholder="Tên sản phẩm"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Loại</label>
            <input
              type="text"
              id="category"
              name="category"
              value={filter.category}
              placeholder="Loại sản phẩm"
              onChange={handleFilterChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá</label>
            <select
              id="price"
              name="price"
              value={filter.price}
              onChange={handleFilterChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="< 300000">Dưới 300k</option>
              <option value="300000 - 800000">300k - 800k</option>
              <option value="800000 - 1500000">800k - 1500k</option>
              <option value="> 1500000">Trên 1500k</option>
            </select>
          </div>
          <button
            onClick={handleFilterClick}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Lọc
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductTable;
