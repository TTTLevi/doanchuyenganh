import PropTypes from "prop-types"

const CategoryDescription = ({ category }) => {
  const renderContent = () => {
    switch (category) {
      case "hoa-chau-thiet-ke":
        return (
          <>
            <p>
              Hoa chậu thiết kế là sự kết hợp hoàn hảo giữa nghệ thuật cắm hoa và sự sáng tạo trong cách trình bày. Những chậu hoa được lựa chọn kỹ lưỡng với các loại hoa tươi đẹp, thường được thiết kế theo những phong cách riêng biệt, từ đơn giản, tinh tế cho đến cầu kỳ, sang trọng. Hoa chậu thiết kế không chỉ là một món quà đẹp mà còn là một cách để thể hiện tình cảm, sự quan tâm và gửi gắm những thông điệp yêu thương, chúc phúc đến người nhận. Mỗi chậu hoa là một tác phẩm nghệ thuật, mang đến sự tươi mới và sức sống cho không gian sống.
            </p>
            <h3 className="text-lg font-medium">Hoa chậu thiết kế là gì?</h3>
            <p>
              Hoa chậu thiết kế là những chậu hoa được trang trí một cách nghệ thuật và cẩn thận, tạo thành những tác phẩm có tính thẩm mỹ cao. Những chậu hoa này có thể được sử dụng để trang trí nội thất, làm quà tặng trong các dịp lễ tết, sinh nhật, hoặc đơn giản là để làm đẹp không gian sống. Hoa chậu thiết kế thường bao gồm sự kết hợp giữa các loại hoa tươi, cây xanh và phụ kiện trang trí như đá, rêu, hoặc các vật liệu tự nhiên khác.
            </p>
            <h3 className="text-lg font-medium">Nguồn gốc của hoa chậu thiết kế?</h3>
            <p>
              Hoa chậu thiết kế có nguồn gốc từ nhu cầu tạo ra những món quà độc đáo và sáng tạo. Ban đầu, hoa được sử dụng chủ yếu để trang trí trong nhà, nhưng theo thời gian, nghệ thuật thiết kế hoa đã phát triển và trở thành một phần không thể thiếu trong các sự kiện, lễ hội, và cả trong trang trí không gian sống hàng ngày. Các chậu hoa thiết kế không chỉ là biểu tượng của sự tươi mới mà còn thể hiện sự tinh tế và phong cách sống của người sở hữu.
            </p>
            <h3 className="text-lg font-medium">Vì sao hoa chậu thiết kế lại được ưa chuộng?</h3>
            <div className="border-l-4 border-gray-500 pl-4">
              <p>Hoa không chỉ là vẻ đẹp thoáng qua, mà là biểu tượng của sự sống mãi mãi. - Câu nói của một nghệ nhân hoa nổi tiếng.</p>
            </div>
            <p>
              Hoa chậu thiết kế không chỉ đẹp về hình thức mà còn mang trong mình những ý nghĩa sâu sắc. Chính vì vậy, chúng đã trở thành món quà ý nghĩa trong nhiều dịp quan trọng. Một chậu hoa thiết kế có thể là món quà thể hiện sự biết ơn, tình yêu hay những lời chúc tốt đẹp. Bên cạnh đó, hoa chậu thiết kế còn giúp không gian sống trở nên sinh động và hài hòa hơn. Với sự sáng tạo không ngừng, những nghệ nhân cắm hoa luôn biết cách biến hóa những chậu hoa đơn giản thành những tác phẩm nghệ thuật độc đáo, làm cho người nhận cảm thấy đặc biệt và trân trọng.
            </p>
            <p>
              Chậu hoa không chỉ là vật trang trí, mà là món quà tinh tế mang theo thông điệp yêu thương, sự quan tâm chân thành và lời chúc phúc tốt đẹp cho người nhận. Cùng với sự phát triển của nghệ thuật cắm hoa, hoa chậu thiết kế ngày càng trở thành sự lựa chọn phổ biến trong việc tạo dựng không gian sống đẹp mắt và đầy cảm hứng.
            </p>
          </>
        );

      case "hoa-tang-hoa-dich-vu":
        return (
          <>
            <p>Hoa - món quà của thiên nhiên, hoa mang vẻ đẹp tinh tế, hương thơm quyến rũ cùng với sắc màu rực rỡ mà ai cũng phải đắm chìm khi nhìn thấy. Vượt xa khỏi vẻ đẹp của mình, hoa còn là biểu tượng sống động của cảm xúc, tình yêu và là một thứ ngôn ngữ không lời.</p>
            <p>Hoa là lời tỏ tình, là sự tôn trọng, là niềm an ủi khi khó khăn, là lời chúc đầy ý nghĩa. Với mỗi màu sắc, hình dáng và hương thơm, hoa giữ một lời nhắn nhủ riêng, một ý nghĩa sâu sắc. Và từ đó hoa tặng là một món quà đầy tinh tế để trao gửi thông điệp không thành lời.</p>
            <h3 className="text-lg font-medium">Nguồn gốc tặng hoa</h3>
            <p>Nguồn gốc phong tục tặng hoa xuất phát từ thời tiền sử khi hoa thường được xem là có công dụng chữa bệnh. Các nhà khảo cổ học đã tìm thấy dấu vết cánh hoa ở một số địa điểm mai táng. Ban đầu, hoa được dùng làm vật tế lễ hoặc mai táng. Người Ai Cập cổ đại và sau đó là người Hy Lạp và La Mã đã sử dụng hoa vì mục đích này. </p>
            <p>Các đồ vật mai táng có hình vẽ hoa anh túc đỏ, hoa thanh cúc và hoa súng có niên đại khoảng năm 1540 TCN đã được tìm thấy ở Ai Cập. Ghi chép về việc tặng hoa xuất hiện trong sử sách của Trung Quốc và văn tự chữ tượng hình Ai Cập, cũng như trong thần thoại Hy Lạp và La Mã. Thói quen tặng hoa nở rộ trong thời Trung Cổ khi các cặp đôi thể hiện tình cảm với nhau bằng hoa.</p>
            <p>Ngày nay, với sự phát triển của xã hội, việc tặng hoa ở Việt Nam ngày càng phổ biến. Hoa không còn giới hạn trong các dịp lễ hội hay thờ cúng, mà đã trở thành một cách trao gửi thông điệp yêu thương, thể hiện lòng biết ơn hay lời chúc tốt đẹp trong cuộc sống hàng ngày. </p>
            <p>Tặng hoa trong ngày sinh nhật, ngày lễ phụ nữ 8/3, 20/10 hay đơn giản là một ngày bình thường, để thể hiện tình yêu, sự quan tâm và lòng kính trọng đang ngày càng phổ biến hơn ở Việt Nam.</p>
            <h3 className="text-lg font-medium">Tại sao nên tặng hoa?</h3>
            <p>Hoa đẹp, có màu sắc tươi mới và tràn đầy sức sống. Hoa mang đến nhiều cung bậc cảm xúc nên hoa mang trong mình nhiều ý nghĩa sâu sắc đa dạng và phong phú. Vì vậy, hoa luôn xuất hiện trong các ngày lễ, trong các dịp quan trọng như một điều không thể thiếu. Và trong các dịp quan trọng của một người như Sinh nhật, Tốt nghiệp, Tân Gia … thì tặng hoa chính là để thay lời muốn nói, và trao gửi lời chúc đầy ý nghĩa cho những cột mốc quan trọng trong cuộc đời mỗi người. </p>
            <p>Tặng hoa là một cách để thể hiện tình cảm, lòng kính trọng và lòng biết ơn. Hoa mang lại sự tinh tế, sự đẹp đẽ và sự hấp dẫn cho bất kỳ sự kiện nào. Hoa cũng là một món quà đầy ý nghĩa, được chọn lọc với tình yêu và sự quan tâm đến người nhận.</p>
          </>
        );

      case "hoa-chia-buon":
        return (
          <>
            <p>
              Trải qua thời khắc đau buồn và tiếc thương khi phải đối mặt với sự ra đi hoặc khi nghe tin về một người quen thân vừa qua đời, đó luôn là một khoảnh khắc đau lòng và là điều mà không ai mong muốn phải trải qua trong đời. Trong thời điểm đau buồn ấy, vòng hoa chia buồn là cách để chúng ta gửi đi những lời chia sẻ từ trái tim. Vòng hoa trở thành một biểu tượng của kính trọng, lời tri ân và tình cảm chân thành. Từng bông hoa, mỗi cành lá đều mang theo những ý nghĩa sâu sắc, chứa đựng những thông điệp không thể nói thành lời, thể hiện những nỗi niềm tiếc thương của người ở lại.
            </p>
            <h3 className="text-lg font-medium">Hoa tang là gì?</h3>
            <p>
              Hoa tang, hay còn gọi là hoa chia buồn, là hoa được dùng để viếng tặng trong lễ tang như một cách để thể hiện sự tôn kính và tiếc thương dành cho người đã mất.
              Hoa tang thường là các loại hoa như hoa Lan, hoa Hồng, hoa Cúc hoặc hoa Lily. Tùy vào ý nghĩa, niềm tin hay tín ngưỡng khác nhau mà hoa sẽ được lựa chọn kỹ lưỡng về màu sắc, hình dáng, chủng loại để cắm trên kệ hoặc theo hình vòng tròn nhằm mang ý nghĩa đặc biệt.
            </p>
            <h3 className="text-lg font-medium">Nguồn gốc của hoa tang?</h3>
            <p>
              Hoa tang có nguồn gốc từ thời xa xưa, khi mà hoa không chỉ được dùng để trang trí mà còn được sử dụng như một cách để truyền đạt cảm xúc. Những bông hoa biểu lộ sự kính trọng đối với người đã ra đi. Hoa tang được xem là một cách để tưởng nhớ, vinh danh người quá cố và chia sẻ nỗi buồn với những người thân còn lại của họ.
            </p>
            <h3 className="text-lg font-medium">Vì sao Vòng Hoa Tang có hình tròn?</h3>
            <div className="border-l-4 border-gray-500 pl-4">
              <p className="">Tự do muôn đời tôi vẫn tự do. Tử sinh chỉ là cửa ngõ ra vào, tử sinh là trò chơi cút bắt. Tôi chưa bao giờ từng sinh cũng chưa bao giờ từng diệt - Thiền sư Thích Nhất Hạnh</p>
            </div>
            <p>
              Giống như Thiền sư Thích Nhất Hạnh đã nói, chúng ta không sinh ra và cũng sẽ không mất đi, sinh và diệt luôn có mặt đồng thời với nhau giống như một hình tròn không có điểm bắt đầu hoặc kết thúc. Khi một người mất đi cũng chính là lúc họ được sinh ra.
            </p>
            <p>Vòng tròn của hoa tang tượng trưng cho chu trình vô tận và sự liên kết vô hạn của sự sống. Là thông điệp để giúp những người thân còn lại nhận ra rằng mặc dù mất mát là một phần tự nhiên nhưng người vừa nằm xuống vẫn sẽ luôn tồn tại mãi, cũng giống như tình yêu thương vô tận dành cho họ. </p>
          </>
        );

      case "hoa-chuc-mung":
        return (
          <>
            <p>Mỗi một bước chân trên con đường thành công đều đáng để dừng lại, ăn mừng và bày tỏ lòng biết ơn với những nỗ lực mà mỗi chúng ta đều đã cố gắng. Ngày khai trương luôn là một dấu mốc quan trọng như vậy. Hoa chúc mừng khai trương không chỉ là một món quà để trao tặng mà còn là lời chúc mừng thành công dành. Lựa chọn hoa khai trương không chỉ đơn thuần là chọn một bó hoa đẹp mà cũng cần có ý nghĩa. Đó còn là cách truyền đạt lời chúc may mắn, thành công và thịnh vượng.</p>
            <h3 className="text-lg font-medium">Hoa khai trương là gì?</h3>
            <p>Hoa khai trương (hoa chúc mừng) các loại bông hoa và lá cây được lựa chọn, sắp xếp cắm đẹp mắt trong một giỏ hoa, lẵng hoa hoặc trên kệ hoa lớn. Mỗi bông hoa, cành lá, mỗi màu sắc và thậm chí cả mỗi chiếc nơ, giấy gói, tất cả đều mang ý nghĩa, tạo nên một thông điệp mạnh mẽ, gửi gắm lời chúc tốt đẹp nhất. Một giỏ hoa khai trương đẹp không chỉ đơn giản là sự kết hợp của màu sắc và hương thơm, mà còn là biểu hiện cho sự tươi vui, niềm hy vọng và những lời chúc phúc tràn đầy may mắn, thịnh vượng.</p>
            <h3 className="text-lg font-medium">Tặng hoa khai trương cho ai?</h3>
            <p>Hoa khai trương được xem như là món quà yêu thương dành tặng cho bạn bè, người thân hay đối tác kinh doanh khi họ bắt đầu một trang mới trong cuộc đời. Dù là khai trương cửa hàng mới, văn phòng mới hay chào mừng một công ty mới đi vào hoạt động - hoa khai trương chính là dấu ấn khởi đầu, đầy ý nghĩa và tràn đầy lời chúc phúc.</p>
            <h3 className="text-lg font-medium">Ý nghĩa của hoa khai trương?</h3>
            <p>Mang ý nghĩa của sự thịnh vượng, khởi sắc và hy vọng cho tương lai tươi sáng. Hoa khai trương không chỉ là một loại quà tặng, mà còn là cách bày tỏ sự quan tâm và ủng hộ đối với một doanh nghiệp hoặc cá nhân đang bắt đầu một hành trình mới. </p>
            <h3 className="text-lg font-medium">Khai trương nên tặng hoa màu gì?</h3>
            <p>Bên cạnh việc lựa chọn loại hoa có ý nghĩa phù hợp thì màu sắc chủ đề của kệ hoa khai trương cũng quan trọng không kém. Trong văn hóa Á Đông, đặc biệt là Việt Nam, màu sắc rực rỡ như đỏ và vàng thường mang ý nghĩa của sự thành công, may mắn và thịnh vượng.</p>
            <p>Ngoài ra, màu xanh lá cây cũng được sử dụng phổ biến trong hoa khai trương. Màu xanh lá cây mang ý nghĩa của sự trường tồn, sự sống còn và sự phát triển bền vững. Điều này thể hiện sự quan tâm và sự hỗ trợ đến sự khởi đầu thành công của người nhận.</p>
            <p>Mỗi loại hoa, mỗi màu sắc, sẽ như những nốt nhạc riêng biệt tạo nên một bản giao hưởng cảm xúc, nói lên những lời chúc tốt đẹp nhất, và cả những điều không thể diễn tả thành lời.</p>
          </>
        );

      case "cay-xanh":
        return (
          <>
            <p>
              Với xu hướng xanh hóa, trồng cây xanh trong nhà hoặc nơi làm việc ngày càng được chú trọng. Cây cảnh đóng vai trò cốt lõi trong việc kiến tạo những mảng xanh trong lành dịu mát, giúp thanh lọc không khí, giảm bức xạ nhiệt, tăng sắc xanh và làm dịu đi những căng thẳng trong cuộc sống.
            </p>
            <h3 className="text-lg font-medium">Cây cảnh là gì?</h3>
            <p>
              Cây cảnh, hay còn gọi là cây kiểng, là những loại cây xanh được trồng và chăm sóc với mục đích trang trí và làm đẹp không gian. Cây cảnh ứng dụng để trang trí trong nhà, văn phòng làm việc hoặc ngoài trời và thường có hình dạng, màu sắc, hoa hoặc lá đẹp.
            </p>
            <p>
              Cây cảnh có rất nhiều loại và kiểu dáng đa dạng. Tùy vào nhu cầu sử dụng khác nhau mà có các loại như cây kiểng lá, hoa kiểng, cây bonsai cũng như các loại cây cảnh mini để bàn hoặc cây phong thủy.
            </p>
            <h3 className="text-lg font-medium">Cây kiểng lá là gì?</h3>
            <p>
              Cây kiểng lá là các loại cây cảnh được trồng và yêu mến nhờ những chiếc lá đẹp mắt của chúng. Những chiếc lá này thường có hình dáng độc đáo, màu sắc đa dạng cũng như đủ loại kích thước.
              Cây kiểng lá không chỉ tô điểm cho không gian sống mà còn giúp cải thiện chất lượng không khí, tạo cảm giác thư giãn và mang lại may mắn, tài lộc.
              Một số loại cây kiểng lá phổ biến Monstera, Đa Đại Phúc, Đế Vương, Trầu Bà Khuyết, Vạn Niên Thanh, Cung Đàn, Đuôi Công, Đuôi Phụng v.v
            </p>
            <h3 className="text-lg font-medium">Cây hoa kiểng là gì?</h3>
            <p>
              Giống như các loại cây kiểng lá được yêu thích nhờ hình dáng độc đáo của lá, cây hoa kiểng là những loại cây được trồng chủ yếu vì màu sắc rực rỡ và hương thơm quyến rũ của hoa. Cây được trồng với mục đích trang trí, làm đẹp không gian sống.
            </p>
            <p>
              Cây hoa kiểng có thể được trồng trong chậu hoặc trực tiếp trên đất, và có thể trồng trong nhà, ban công hoặc ngoài trời, tùy thuộc vào từng loại cây và yêu cầu về điều kiện môi trường sống của cây.
              Có nhiều loại hoa chậu khác nhau như hoa Hồng, hoa Lan, Cẩm Tú Cầu, Tiểu Quỳnh, Bâng Khuâng, Calla Lily v.v
            </p>
            <h3 className="text-lg font-medium">Cây xanh có vai trò gì trong cuộc sống?</h3>
            <p>
              Cây xanh có vai trò quan trọng trong việc tạo ra môi trường sống không gian sống, giúp thanh lọc không khí, giảm bức xạ nhiệt, tăng sắc xanh và làm dịu đi những căng thẳng trong cuộc sống.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderContent()}</div>;
};

export default CategoryDescription;

CategoryDescription.propTypes = {
  category: PropTypes.string.isRequired,
};
