package com.krishibandhu.service;

import org.springframework.stereotype.Service;

import com.krishibandhu.dto.ProfileRequest;
import com.krishibandhu.entity.User;
import com.krishibandhu.repository.UserRepository;

@Service
public class FarmerService {

    private final UserRepository userRepository;

    public FarmerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get Farmer Profile
    public User getProfile(Long id) {

        return userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Farmer Not Found"));
    }

    // Update Farmer Profile
    public String updateProfile(
            Long id,
            ProfileRequest request) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Farmer Not Found"));

        user.setVillage(request.getVillage());
        user.setDistrict(request.getDistrict());
        user.setState(request.getState());
        user.setLanguage(request.getLanguage());
        user.setLandArea(request.getLandArea());

        userRepository.save(user);

        return "Profile Updated Successfully";
    }
}