package com.campus.resource.dto;

import lombok.Data;

@Data
public class BorrowRequestPayload {
    private Long resourceId;
    private Long borrowerId;
}
