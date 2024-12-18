package stu.edu.vn.nhom3.doan_laptrinhweb.dto;

import lombok.*;
import stu.edu.vn.nhom3.doan_laptrinhweb.model.ProductOrder;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderDTO {
    private long id;
    private String address;
    private String phone;
    private Date createTime;
    private double total;
    private String code;
    private String status;
    private int customerId;
    private int paymentId;

    private String customerName;
    private List<ProductOrder> productOrders;
}
