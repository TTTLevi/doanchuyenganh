import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FcUpload } from "react-icons/fc";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_COUNT = 10; // Maximum number of files allowed

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    noClick: true, // Disable default click behavior to avoid conflicts
    onDrop: async (acceptedFiles) => {
      if (files.length + acceptedFiles.length > MAX_FILE_COUNT) {
        toast.error(`Chỉ được phép tải lên tối đa ${MAX_FILE_COUNT} tệp.`);
        return;
      }

      const validFiles = [];
      const newPreviews = [];

      for (const file of acceptedFiles) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`Tệp ${file.name} quá lớn. Vui lòng chọn tệp nhỏ hơn 4MB.`);
          continue;
        }

        if (!VALID_FILE_TYPES.includes(file.type)) {
          toast.error(`Tệp ${file.name} không hợp lệ. Vui lòng chọn tệp JPEG, PNG, GIF hoặc WEBP.`);
          continue;
        }

        const preview = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        validFiles.push(file);
        newPreviews.push(preview);
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
  });

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    document.querySelector('input').blur(); // làm mất focus của input file
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setPreviews([]);
    document.querySelector('input').blur(); // làm mất focus của input file
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 p-4 py-10 rounded-lg w-full text-center"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div>
            <FcUpload size={30} className="h-10 w-10" />
          </div>
          <p>Kéo và thả ảnh vào đây hoặc <span onClick={open} className="text-blue-500 cursor-pointer underline">nhấp để chọn ảnh</span></p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="w-full mt-4">
          <button
            onClick={handleRemoveAll}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xóa tất cả
          </button>
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Xem trước</th>
                <th className="border border-gray-300 p-2">Tên tệp</th>
                <th className="border border-gray-300 p-2">Dung lượng</th>
                <th className="border border-gray-300 p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={`${file.name}-${index}`}>
                  <td className="border border-gray-300 p-2 flex items-center justify-center">
                    {previews[index] && (
                      <img
                        src={previews[index]}
                        alt={file.name}
                        className="w-32 h-32 object-cover"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p className="line-clamp-1">{file.name}</p>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <p>{(file.size / 1024).toFixed(2)} KB</p>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="w-full flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
