package com.campus.resource.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String category;
    
    private String description;
    
    @Column(name = "condition_status", nullable = false)
    private String conditionStatus;
    
    @Column(name = "availability_status", nullable = false)
    private String availabilityStatus = "AVAILABLE";
    
    @Column(name = "owner_id", nullable = false)
    private Long ownerId;
    
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
