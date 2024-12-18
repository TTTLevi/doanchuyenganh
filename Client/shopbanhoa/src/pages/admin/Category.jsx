import { useEffect, useState } from 'react';
import Header from "../../components/admin/common/Header";
import Model from "../../components/Model";
import { motion } from 'framer-motion';
import { apiGetAllCategory, apiAddCategory, apiDeleteCategory, apiUpdateCategory } from '../../apis/apiCategory';
import { toast } from 'react-toastify';
import { createSlug } from '../../utils/helper';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editData, setEditData] = useState({});

  const getAllCategories = async () => {
    const response = await apiGetAllCategory();
    setCategories(response.data);
  };

  const handleDeleteCategory = async (index) => {
    try {
      const response = await apiDeleteCategory(index);
      if (response.status === 200) {
        toast.success(response.data)
        const res = await getAllCategories();
        setCategories(res.data);
      }
    } catch (err) {
      toast.error(err.response.data)
    }
  };

  const handleClickEdit = (id) => {
    setHandle("edit")
    const data = categories?.find((category) => category.id === id);
    setEditData(data);
    setNewCategory(data);
    setIsModelOpen(true);
  }

  const handleCategory = async () => {
    const data = { name: newCategory, code: createSlug(newCategory) };
    if (handle === "add") {
      const res = await apiAddCategory(data);
      console.log(res.data);
      if (res.status === 200) {
        setCategories([...categories, res.data]);
      } else {
        toast.error("Lỗi thêm danh mục")
      }
    } else {
      if (data.name === "") {
        toast.error("Tên danh mục không được để trống")
        return;
      }
      const res = await apiUpdateCategory(editData.id, data);
      if (res.status === 200) {
        toast.success(res.data)
        getAllCategories()
      }
      console.log(res.data);
    }
    setNewCategory("");
    setIsModelOpen(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10  min-h-screen">
      <Header title='Danh mục sản phẩm' />
      <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700 mt-11 ml-11 mr-11'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-2">
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-orange-500'>Danh sách danh mục</h2>
            <button
              onClick={() => {
                setNewCategory({})
                setHandle("add");
                setIsModelOpen(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
            >
              Thêm
            </button>
          </div>

          <table className="min-w-full bg-white mt-6 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600">STT</th>
                <th className="py-3 px-4 text-left text-gray-600">Tên danh mục</th>
                <th className="py-3 px-4 text-left text-gray-600">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-3">{index + 1}</td>
                  <td className="border px-4 py-3">{category.name}</td>
                  <td className="border px-4 py-3">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-300 mr-2"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleClickEdit(category.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition duration-300"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Model
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      >
        <h3 className='text-2xl font-bold text-center text-green-700'>{handle === "edit" ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h3>
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) => setNewCategory(e.target.value)}
          className="mt-5 mb-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleCategory}
        >
          {handle === "edit" ? "Sửa" : "Thêm"}
        </button>
      </Model>


      {/* <Model
        isModelOpen={isEdit}
        setIsModelOpen={setIsEdit}
      >
        <EditCategory
          isEdit={isEdit}
          categoryId={categoryId}
          handleUpdateCategory={handleUpdateCategory}
          handleAddCategory={handleAddCategory}
          categoryName={categories[categoryId] && categories[categoryId].name}
        />
      </Model> */}
    </div>
  );
};

export default Category;
