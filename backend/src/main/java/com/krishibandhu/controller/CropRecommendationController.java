package com.krishibandhu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.entity.CropRecommendation;
import com.krishibandhu.service.CropRecommendationService;

@RestController
@RequestMapping("/api/crops")

public class CropRecommendationController {

    private final CropRecommendationService service;

    public CropRecommendationController(
            CropRecommendationService service) {

        this.service = service;
    }

    @GetMapping("/all")
    public List<CropRecommendation> getAll() {

        return service.getAllCrops();
    }

    @GetMapping("/soil")
    public List<CropRecommendation> getBySoilType(
            @RequestParam String soilType) {

        return service.getBySoilType(soilType);
    }

    @GetMapping("/recommend")
    public List<CropRecommendation> recommend(
            @RequestParam String soilType,
            @RequestParam String season) {

        return service.getRecommendation(
                soilType,
                season);
    }

    @PostMapping("/add")
    public CropRecommendation addCrop(
            @RequestBody CropRecommendation crop) {

        return service.saveCrop(crop);
    }
}