package stu.edu.vn.nhom3.doan_laptrinhweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.Image;
import stu.edu.vn.nhom3.doan_laptrinhweb.repository.ImageRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private static final Logger logger = Logger.getLogger(ImageService.class.getName());

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public void addNewImage(int productId, String fileUrl) {
        Image image = new Image();
        image.setProduct_id(productId);
        image.setUrl(fileUrl);
        imageRepository.save(image);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image getFirstImage(int productId) {
        // Sử dụng truy vấn repository để lấy ảnh đầu tiên
        return imageRepository.findFirstByProduct_id(productId);
    }

    public List<Image> getImagesByProductId(int productId) {
        // Sử dụng truy vấn repository để lấy các ảnh của sản phẩm
        List<Image> images = imageRepository.findByProduct_id(productId);

        // Log các URL của ảnh
        images.forEach(image -> {
            logger.info("getImgById");
            logger.info(image.getUrl());
        });

        return images;
    }

    public void updateImages(int productId, List<String> urls) {
        List<Image> existingImages = getImagesByProductId(productId);

        // Cập nhật hoặc xóa các ảnh hiện tại
        for (int i = 0; i < existingImages.size(); i++) {
            if (i < urls.size()) {
                // Cập nhật URL nếu còn URL mới
                Image image = existingImages.get(i);
                image.setUrl(urls.get(i));
                imageRepository.save(image);
            } else {
                // Xóa ảnh thừa
                cloudinaryService.deleteFile(existingImages.get(i).getUrl());
                imageRepository.delete(existingImages.get(i));
            }
        }

        // Thêm các ảnh mới nếu có
        if (urls.size() > existingImages.size()) {
            for (int i = existingImages.size(); i < urls.size(); i++) {
                addNewImage(productId, urls.get(i));
            }
        }
    }

    public void deleteAllImageFromProduct(int productId) {
        List<Image> images = getImagesByProductId(productId);

        // Xóa file trên Cloudinary trước khi xóa trong database
        images.forEach(image -> cloudinaryService.deleteFile(image.getUrl()));

        imageRepository.deleteAll(images);
    }

    public List<String> getProductImagesLink(List<Image> images) {
        return images.stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
    }
}