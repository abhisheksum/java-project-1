package com.campus.resource.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "borrow_requests")
public class BorrowRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "resource_id", nullable = false)
    private Long resourceId;
    
    @Column(name = "borrower_id", nullable = false)
    private Long borrowerId;
    
    @Column(nullable = false)
    private String status = "PENDING";
    
    @Column(name = "request_date", insertable = false, updatable = false)
    private LocalDateTime requestDate;
    
    @Column(name = "return_date")
    private LocalDateTime returnDate;
}
