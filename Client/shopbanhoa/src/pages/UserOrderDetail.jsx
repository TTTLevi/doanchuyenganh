
const OrderDetail = ({listProduct}) => {

  console.log(listProduct)
  return (
    listProduct?.map(el => {
      return <div key={el.id}>
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center">
          <img src={el?.listImage[0]} alt="" className="w-16 h-16 sm:w-20 sm:h-20  object-cover rounded-lg" />
          <div className="ml-4">
            <p className="font-medium sm:text-base">{el.name}</p>

            <div className="flex items-center mt-2 gap-3 text-base text-gray-700">
              <span className="text-gray-500">Số lượng: {el.quantity}</span>

              <span className="mx-2">|</span>

              <span className="text-gray-500">Đơn giá: {el.price.toLocaleString()}đ</span>

              <span className="mx-2">|</span>

              <span className="text-gray-500">Tổng: {(el.price * el.quantity).toLocaleString()}đ</span>
            </div>

          </div>
        </div>
      </div>
    </div>
    })
      )
}

      export default OrderDetail