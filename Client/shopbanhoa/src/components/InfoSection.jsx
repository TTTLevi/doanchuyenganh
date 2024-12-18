
const InfoSection = () => {
  const infoItems = [
    {
      img: "https://shop.dalathasfarm.com/public/dalathasfarm/images/commit.png",
      title: "Cam kết",
      description: "Giá cả hợp lý"
    },
    {
      img: "https://shop.dalathasfarm.com/public/dalathasfarm/images/shipping.png",
      title: "Giao hàng nhanh",
      description: "Nội thành",
    },
    {
      img: "https://shop.dalathasfarm.com/public/dalathasfarm/images/guarantee.png",
      title: "Đảm bảo",
      description: "Sạch, Tươi, Mới",
    },
    {
      img: "https://shop.dalathasfarm.com/public/dalathasfarm/images/sustainability.png",
      title: "Thân thiện",
      description: "Môi trường sống",
    }
  ]

  return (
    <div className="bg-white pb-8 pt-12">
      <div className="md:max-w-[700px]  container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center py-[19px] border rounded-lg shadow-md hover:shadow-xl transition-all duration-300
            transform hover:scale-105">
            <img src={item.img} alt={item.title} className="w-16 h-16" />
            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoSection