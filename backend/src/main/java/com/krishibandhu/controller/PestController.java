package com.krishibandhu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.entity.PestDetection;
import com.krishibandhu.service.PestDetectionService;

@RestController
@RequestMapping("/api/pest")

public class PestController {

    private final PestDetectionService service;

    public PestController(
            PestDetectionService service) {

        this.service = service;
    }

    @PostMapping("/add")
    public PestDetection addDetection(
            @RequestBody PestDetection pestDetection) {

        return service.saveDetection(
                pestDetection);
    }

    @GetMapping("/all")
    public List<PestDetection> getAll() {

        return service.getAllDetections();
    }

    @GetMapping("/user/{userId}")
    public List<PestDetection> getByUser(
            @PathVariable Long userId) {

        return service.getByUser(userId);
    }
}