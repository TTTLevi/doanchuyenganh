const About = () => {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-11">
        <div className="space-y-8">
          {/* Giới thiệu section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">Giới thiệu Flower Shop</h2>
                <p className="text-gray-600 leading-relaxed">
                  Flower Shop là một cửa hàng chuyên cung cấp các loại hoa tươi đẹp, đa dạng từ hoa lãng mạn, hoa chúc mừng đến các loại hoa trang trí cho không gian sống. Chúng tôi tự hào mang đến cho khách hàng những bó hoa tươi nhất, được chăm sóc và lựa chọn kỹ lưỡng từ các nhà vườn uy tín tại Đà Lạt.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000" 
                  alt="Flower Shop Store Front" 
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Nguồn gốc section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row-reverse gap-6">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">Nguồn gốc</h2>
                <p className="text-gray-600 leading-relaxed">
                  Được thành lập từ năm 2020, Flower Shop bắt đầu từ một cửa hàng nhỏ tại thành phố Đà Lạt - thủ phủ của hoa tươi Việt Nam. Với niềm đam mê và tình yêu với hoa, chúng tôi đã không ngừng phát triển và mở rộng, xây dựng mối quan hệ trực tiếp với các nhà vườn địa phương để đảm bảo nguồn hoa chất lượng cao nhất.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Tất cả các loại hoa của chúng tôi đều được trồng trong điều kiện khí hậu lý tưởng của Đà Lạt, được chăm sóc bởi những người nông dân có kinh nghiệm và tâm huyết với nghề.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1589123053646-4e8c49d46b35?q=80&w=1000" 
                  alt="Flower Garden in Dalat" 
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Tầm nhìn section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">Tầm nhìn</h2>
                <p className="text-gray-600 leading-relaxed">
                  Flower Shop hướng đến việc trở thành thương hiệu hàng đầu trong lĩnh vực cung cấp hoa tươi tại Việt Nam. Chúng tôi cam kết:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                  <li>Cung cấp những sản phẩm hoa tươi chất lượng cao với giá cả hợp lý</li>
                  <li>Đảm bảo dịch vụ khách hàng chuyên nghiệp và tận tâm</li>
                  <li>Không ngừng đổi mới và sáng tạo trong thiết kế hoa</li>
                  <li>Mở rộng mạng lưới cửa hàng để phục vụ khách hàng tốt hơn</li>
                  <li>Đóng góp vào sự phát triển của ngành hoa Việt Nam</li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=1000" 
                  alt="Hoa vạn thọ" 
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About