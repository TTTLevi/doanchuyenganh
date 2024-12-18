import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Header from "../../components/admin/common/Header";
import { apiGetAllCategory } from "../../apis/apiCategory";
import { apiAddProduct, apiGetProductById, apiUpdateProduct } from "../../apis/apiProduct";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TbRuler2 } from "react-icons/tb";
import { FiLoader } from "react-icons/fi";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_COUNT = 7;

const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageChoosed, setImageChoosed] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    const validFiles = [];
    let invalidCount = 0;

    acceptedFiles.forEach((file) => {
      if (
        VALID_FILE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE &&
        images.length + validFiles.length < MAX_FILE_COUNT
      ) {
        validFiles.push(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      } else {
        invalidCount++;
      }
    });

    if (invalidCount > 0) {
      toast.error(`Tệp không hợp lệ hoặc vượt quá giới hạn.`);
    }

    fileRejections.forEach((rejection) => {
      toast.error(`"${rejection.file.name}" không hợp lệ hoặc vượt quá kích thước cho phép.`);
    });

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(TbRuler2)

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category_id", formData.category);
    data.append("price", formData.price);
    data.append("unit", formData.unit);
    data.append("theme", formData.theme);
    data.append("description", formData.description);

    if (images.length > 0) {
      images.forEach((image) => {
        if (image instanceof File) {
          data.append("images", image);
        }
        console.log(images)
      });
    }

    try {
      if (id) {
        const response = await apiUpdateProduct(id, data);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/admin/san-pham");
        } else {
          toast.error(response.data.message);
        }
      } else {
        await apiAddProduct(data);
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/san-pham");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
    setIsLoading(false)
  };

  const handleGetCategory = async () => {
    const res = await apiGetAllCategory();
    if (res.status === 200) {
      setCategories(res.data);
    }
  };

  const handleGetProductById = async (id) => {
    const res = await apiGetProductById(id);
    console.log(res.data)
    if (res.status === 200) {
      setFormData({
        name: res.data.name,
        category: res.data.category_id,
        theme: res.data.theme,
        price: res.data.price,
        unit: res.data.unit,
        description: res.data.description,
      });
      // if (res.data.listImage) {
      //   setImages(res.data.listImage.map((img) => ({ preview: img })));
      // }
      setImageChoosed(res.data.listImage)
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  useEffect(() => {
    handleGetCategory();
    if (id) {
      handleGetProductById(id);
    }

    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [id]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"} />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-700 mt-11 ml-11 mr-11"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form action="" className="flex flex-col w-full items-start gap-3">
          <div>
          {
                id && <div>
                  <p className="mb-2 font-semibold text-yellow-300">Hình ảnh cũ của sản phẩm</p>
                  <div className="flex gap-7">
                    {
                      imageChoosed?.map((el, index) => {
                        return <img
                          key={index}
                          src={el}
                          className="w-32 h-40 object-cover rounded-md shadow-md"
                        />
                      })
                    }
                  </div>
                </div>
              }

            <p className="mb-2 mt-5 font-semibold text-yellow-300">Chọn hình</p>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-blue-500 p-7 rounded-md cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p className="text-green-300">Kéo thả hình hoặc nhấn để chọn tệp</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={file.preview}
                    alt={`preview-${index}`}
                    className="w-32 h-36 object-cover rounded-md shadow-md"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full">
            <div className="text-yellow-300 mb-2">Tên sản phẩm</div>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name || ""}
              className="w-full max-w-[500px] px-3 py-2 text-gray-700 bg-white rounded-lg outline-teal-500"
              required
            />
          </div>

          <div className="w-full">
            <div className="text-yellow-300 mb-2">Danh mục sản phẩm</div>
            <select
              onChange={handleInputChange}
              name="category"
              className="w-full max-w-[500px] px-3 py-2 text-gray-700 bg-white rounded-lg outline-teal-500"
              required
              value={formData.category || ""}
            >
              <option value="" disabled>Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <div className="text-yellow-300 mb-2">Chủ đề</div>
            <input
              type="text"
              onChange={handleInputChange}
              name="theme"
              value={formData.theme || ""}
              className="w-full max-w-[500px] px-3 py-2 text-gray-700 bg-white rounded-lg outline-teal-500"
              required
            />
          </div>

          <div className="w-full">
            <div className="text-yellow-300 mb-2">Mô tả sản phẩm</div>
            <ReactQuill
              className="bg-white"
              name="description"
              theme="snow"
              value={formData.description || ""}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-9">
            <div>
              <div className="text-yellow-300 mb-2">Giá bán</div>
              <input
                type="number"
                onChange={handleInputChange}
                value={formData.price || ""}
                name="price"
                className="w-full sm:w-[200px] px-3 py-2 text-gray-700 bg-white rounded-lg outline-teal-500"
                required
              />
            </div>
            <div>
              <div className="text-yellow-300 mb-2">Đơn vị tính</div>
              <select
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg sm:w-[200px]"
                value={formData.unit || ""}
                name="unit"
              >
                <option value="Giỏ">Giỏ</option>
                <option value="Bó">Bó</option>
                <option value="Chậu">Chậu</option>
                <option value="Kệ">Kệ</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center w-full mt-11">
            {
              !isLoading ? (
                <button
                  className="w-[50%] px-6 py-2 bg-yellow-300 text-gray-800 rounded-full hover:bg-yellow-400 transition duration-200"
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
              ) :
                <div
                  className="w-[50%] flex items-center justify-center px-6 py-2 bg-yellow-200 text-gray-800 rounded-full transition duration-200"
                >
                  <FiLoader className="animate-spin" size={20} />
                </div>
            }
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddEditProductPage;
