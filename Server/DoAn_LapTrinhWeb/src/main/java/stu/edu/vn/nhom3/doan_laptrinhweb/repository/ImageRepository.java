package stu.edu.vn.nhom3.doan_laptrinhweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findFirstByProduct_id(int productId);
    List<Image> findByProduct_id(int productId);
}
