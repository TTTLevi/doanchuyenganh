package stu.edu.vn.nhom3.doan_laptrinhweb.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CategoryResponse {
    private int id;
    private String name;
    private String code;
    private int countProduct;
}
