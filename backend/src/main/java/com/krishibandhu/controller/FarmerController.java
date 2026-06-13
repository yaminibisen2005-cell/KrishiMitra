package com.krishibandhu.controller;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.dto.ProfileRequest;
import com.krishibandhu.entity.User;
import com.krishibandhu.service.FarmerService;

@RestController
@RequestMapping("/api/farmer")

public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    // Get Profile
    @GetMapping("/profile/{id}")
    public User getProfile(
            @PathVariable Long id) {

        return farmerService.getProfile(id);
    }

    // Update Profile
    @PutMapping("/profile/{id}")
    public String updateProfile(
            @PathVariable Long id,
            @RequestBody ProfileRequest request) {

        return farmerService.updateProfile(id, request);
    }
}