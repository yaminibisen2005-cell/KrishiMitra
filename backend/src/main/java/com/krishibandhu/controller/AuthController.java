package com.krishibandhu.controller;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.dto.LoginRequest;
import com.krishibandhu.dto.LoginResponse;
import com.krishibandhu.dto.RegisterRequest;
import com.krishibandhu.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}