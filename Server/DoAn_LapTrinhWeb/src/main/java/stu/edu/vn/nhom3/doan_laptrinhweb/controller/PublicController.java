package stu.edu.vn.nhom3.doan_laptrinhweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stu.edu.vn.nhom3.doan_laptrinhweb.dto.CategoryDTO;
import stu.edu.vn.nhom3.doan_laptrinhweb.dto.ProductDTO;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.Category;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.Image;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.Product;
import stu.edu.vn.nhom3.doan_laptrinhweb.services.AdminService;
import stu.edu.vn.nhom3.doan_laptrinhweb.services.CategoryService;
import stu.edu.vn.nhom3.doan_laptrinhweb.services.ImageService;
import stu.edu.vn.nhom3.doan_laptrinhweb.services.ProductService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/public/")
public class PublicController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private CategoryService categoryService;


    @GetMapping(value = "/getAllProducts")
    public ResponseEntity<List<ProductDTO>> getAllProducts()
    {
        return ResponseEntity.ok().body(adminService.getAllProduct());
    }

    @GetMapping(value = "/getAllCategories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories()
    {
        return ResponseEntity.ok().body(adminService.getAllCategory());
    }

    @GetMapping("/findProduct/{product_id}")
    public ResponseEntity<ProductDTO> findProductById(@PathVariable("product_id") int id) {

        Product product = productService.findById(id);
        if(product!=null)
        {
            List<Image> product_images = imageService.getImagesByProductId(id);
            Category category = categoryService.findById(product.getCate_id());

            ProductDTO productDTO = new ProductDTO();
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setUnit(product.getUnit());
            productDTO.setTheme(product.getTheme());
            productDTO.setId(product.getId());
            productDTO.setCategory_id(product.getCate_id());
            productDTO.setCategory_name(category.getName());
            productDTO.setListImage(imageService.getProductImagesLink(product_images));
            return ResponseEntity.ok(productDTO);
        }

        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/findProductByCate/{cate_code}")
    public ResponseEntity<List<ProductDTO>> findProductById(@PathVariable("cate_code") String cate_code) {
        List<Category> dsCate = categoryService.findAll();
        Category category = null;
        for(Category c : dsCate){
            if(c.getCode().equals(cate_code)){
                category = c;
            }
        }

        List<ProductDTO> listPro = adminService.getAllProduct();
        List<ProductDTO> productDTOList = new ArrayList<ProductDTO>();
        for(ProductDTO p : listPro){
            if(category.getId() == p.getCategory_id()){
                productDTOList.add(p);
            }
        }

        return ResponseEntity.ok().body(productDTOList);
    }

}
