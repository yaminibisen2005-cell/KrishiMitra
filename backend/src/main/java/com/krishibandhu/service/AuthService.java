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

        user.setName(request.getName());
        user.setMobile(request.getMobile());

        // New Fields
        user.setVillage(request.getVillage());
        user.setDistrict(request.getDistrict());
        user.setState(request.getState());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

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

            LoginResponse response =
                    new LoginResponse();

            response.setMessage("User Not Found");

            return response;
        }

        boolean match =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!match) {

            LoginResponse response =
                    new LoginResponse();

            response.setMessage("Invalid Password");

            return response;
        }

        String token =
                JwtUtil.generateToken(
                        user.getMobile());

        LoginResponse response =
                new LoginResponse();

        response.setUserId(user.getId());
        response.setToken(token);
        response.setMessage("Login Successful");

        response.setName(user.getName());
        response.setMobile(user.getMobile());
        response.setVillage(user.getVillage());
        response.setDistrict(user.getDistrict());
        response.setState(user.getState());

        return response;
    }
}