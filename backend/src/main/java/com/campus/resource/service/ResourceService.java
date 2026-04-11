package com.campus.resource.service;

import com.campus.resource.entity.Resource;
import com.campus.resource.exception.ResourceNotFoundException;
import com.campus.resource.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource createResource(Resource resource) {
        resource.setCreatedAt(LocalDateTime.now());
        if (resource.getAvailabilityStatus() == null) {
            resource.setAvailabilityStatus("AVAILABLE");
        }
        return resourceRepository.save(resource);
    }

    public Resource updateResource(Long id, Resource resourceDetails) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));

        resource.setTitle(resourceDetails.getTitle());
        resource.setCategory(resourceDetails.getCategory());
        resource.setDescription(resourceDetails.getDescription());
        resource.setConditionStatus(resourceDetails.getConditionStatus());
        
        if (resourceDetails.getAvailabilityStatus() != null) {
            resource.setAvailabilityStatus(resourceDetails.getAvailabilityStatus());
        }

        return resourceRepository.save(resource);
    }

    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }
}
