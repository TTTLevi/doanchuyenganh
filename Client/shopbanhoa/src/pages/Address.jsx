const Address = () => {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-11">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Địa chỉ cửa hàng</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-semibold w-24">Địa chỉ:</span>
                <span>450 Nguyên Tử Lực, P.8, Đà Lạt, Lâm Đồng, Việt Nam</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-24">Điện thoại:</span>
                <span>0788773399</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-24">Email:</span>
                <span>flowershop@example.com</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-24">Giờ mở cửa:</span>
                <span>8:00 - 21:00 (Thứ 2 - Chủ nhật)</span>
              </p>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="h-[400px] bg-white rounded-lg shadow-md overflow-hidden relative w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d487.89155997083805!2d108.45450622710186!3d11.965328361462552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112e98cbfafc5%3A0x530e3209f093702b!2zNDUwIMSQxrDhu51uZyBOZ3V5w6puIFThu60gTOG7sWMsIFBoxrDhu51uZyA4LCDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1731946037210!5m2!1sen!2s" 
              width="655" 
              height="400" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address