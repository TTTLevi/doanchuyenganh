const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className="flex">
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-green-700 bg-white"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
