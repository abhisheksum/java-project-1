package com.campus.resource.service;

import com.campus.resource.dto.BorrowRequestPayload;
import com.campus.resource.entity.BorrowRequest;
import com.campus.resource.entity.Resource;
import com.campus.resource.exception.ResourceNotFoundException;
import com.campus.resource.repository.BorrowRequestRepository;
import com.campus.resource.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BorrowService {

    private final BorrowRequestRepository borrowRequestRepository;
    private final ResourceRepository resourceRepository;

    public BorrowService(BorrowRequestRepository borrowRequestRepository, ResourceRepository resourceRepository) {
        this.borrowRequestRepository = borrowRequestRepository;
        this.resourceRepository = resourceRepository;
    }

    @Transactional
    public BorrowRequest requestBorrow(BorrowRequestPayload payload) {
        Resource resource = resourceRepository.findById(payload.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        if (!"AVAILABLE".equals(resource.getAvailabilityStatus())) {
            throw new IllegalArgumentException("Resource is not available for borrowing");
        }

        BorrowRequest request = new BorrowRequest();
        request.setResourceId(payload.getResourceId());
        request.setBorrowerId(payload.getBorrowerId());
        request.setStatus("PENDING");
        request.setRequestDate(LocalDateTime.now());

        return borrowRequestRepository.save(request);
    }

    @Transactional
    public BorrowRequest approveRequest(Long id) {
        BorrowRequest request = borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow request not found"));

        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalArgumentException("Request is not in PENDING state");
        }

        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        resource.setAvailabilityStatus("BORROWED");
        resourceRepository.save(resource);

        request.setStatus("APPROVED");
        return borrowRequestRepository.save(request);
    }

    @Transactional
    public BorrowRequest rejectRequest(Long id) {
        BorrowRequest request = borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow request not found"));

        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalArgumentException("Request is not in PENDING state");
        }

        request.setStatus("REJECTED");
        return borrowRequestRepository.save(request);
    }

    @Transactional
    public BorrowRequest returnResource(Long id) {
        BorrowRequest request = borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow request not found"));

        if (!"APPROVED".equals(request.getStatus())) {
            throw new IllegalArgumentException("Resource is not currently borrowed");
        }

        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        resource.setAvailabilityStatus("AVAILABLE");
        resourceRepository.save(resource);

        request.setStatus("RETURNED");
        request.setReturnDate(LocalDateTime.now());
        return borrowRequestRepository.save(request);
    }
}
