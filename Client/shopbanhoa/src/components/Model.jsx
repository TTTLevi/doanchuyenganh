
const Model = ({ isModelOpen, setIsModelOpen, children }) => {
  if (!isModelOpen) return null
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[570px] relative">
        <button className="absolute top-3 right-5 text-green-700 text-3xl"
          onClick={() => setIsModelOpen(false)}
        >
          &times;
        </button>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Model