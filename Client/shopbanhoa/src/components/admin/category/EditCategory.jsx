import { useState, useEffect } from 'react';

const EditCategory = ({ isEdit, categoryId, handleUpdateCategory, categoryName, handleAddCategory }) => {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (isEdit) {
      setNewName(categoryName);
    } else {
      setNewName('');
    }
  }, [isEdit, categoryName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      handleUpdateCategory(categoryId, newName);
    } else {
      handleAddCategory(newName);
    }
  };

  return (
    <div>
      <h3 className='text-2xl font-bold text-center text-green-700'>{isEdit?"Chỉnh sửa danh mục":"Thêm danh mục"}</h3>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white mt-7">
        <div className='mb-2'>
          <label className="block text-sm font-medium text-gray-700 pb-2">Tên danh mục:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEdit ? 'Lưu' : 'Thêm'}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
