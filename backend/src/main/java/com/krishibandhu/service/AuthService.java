package com.krishibandhu.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.krishibandhu.dto.LoginRequest;
import com.krishibandhu.dto.LoginResponse;
import com.krishibandhu.dto.RegisterRequest;
import com.krishibandhu.entity.User;
import com.krishibandhu.repository.UserRepository;
import com.krishibandhu.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ==========================
    // REGISTER
    // ==========================
    public String register(RegisterRequest request) {

        if (userRepository
                .findByMobile(request.getMobile())
                .isPresent()) {

            return "Mobile Number Already Exists";
        }

        User user = new User();

        user.setName(
                request.getName());

        user.setMobile(
                request.getMobile());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setVillage(
                request.getVillage());

        user.setDistrict(
                request.getDistrict());

        user.setState(
                request.getState());

        userRepository.save(user);

        return "User Registered Successfully";
    }
    // ==========================
    // LOGIN
    // ==========================
    public LoginResponse login(
            LoginRequest request) {

        User user =
                userRepository
                .findByMobile(
                        request.getMobile())
                .orElse(null);

        if (user == null) {

            return new LoginResponse(
                    null,
                    null,
                    "User Not Found");
        }

        boolean match =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!match) {

            return new LoginResponse(
                    null,
                    null,
                    "Invalid Password");
        }

        String token =
                JwtUtil.generateToken(
                        user.getMobile());

        LoginResponse response =
                new LoginResponse(
                        user.getId(),
                        token,
                        "Login Successful");

        response.setName(user.getName());
        response.setMobile(user.getMobile());
        response.setVillage(user.getVillage());
        response.setDistrict(user.getDistrict());
        response.setState(user.getState());
        response.setLanguage(user.getLanguage());
        response.setLandArea(user.getLandArea());

        return response;
    }
}