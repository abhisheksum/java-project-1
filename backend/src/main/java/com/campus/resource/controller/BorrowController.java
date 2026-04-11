package com.campus.resource.controller;

import com.campus.resource.dto.BorrowRequestPayload;
import com.campus.resource.entity.BorrowRequest;
import com.campus.resource.service.BorrowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/borrow")
@CrossOrigin(origins = "*")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/request")
    public ResponseEntity<BorrowRequest> requestBorrow(@RequestBody BorrowRequestPayload payload) {
        return new ResponseEntity<>(borrowService.requestBorrow(payload), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BorrowRequest> approveRequest(@PathVariable Long id) {
        return ResponseEntity.ok(borrowService.approveRequest(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<BorrowRequest> rejectRequest(@PathVariable Long id) {
        return ResponseEntity.ok(borrowService.rejectRequest(id));
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<BorrowRequest> returnResource(@PathVariable Long id) {
        return ResponseEntity.ok(borrowService.returnResource(id));
    }
}
