package com.krishibandhu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.krishibandhu.entity.CropRecommendation;
import com.krishibandhu.repository.CropRecommendationRepository;

@Service
public class CropRecommendationService {

    private final CropRecommendationRepository repository;

    public CropRecommendationService(
            CropRecommendationRepository repository) {

        this.repository = repository;
    }

    public List<CropRecommendation> getBySoilType(
            String soilType) {

        return repository.findBySoilType(soilType);
    }

    public List<CropRecommendation> getBySeason(
            String season) {

        return repository.findBySeason(season);
    }

    public List<CropRecommendation> getRecommendation(
            String soilType,
            String season) {

        return repository.findBySoilTypeAndSeason(
                soilType,
                season);
    }

    public CropRecommendation saveCrop(
            CropRecommendation crop) {

        return repository.save(crop);
    }

    public List<CropRecommendation> getAllCrops() {

        return repository.findAll();
    }
    public List<CropRecommendation>
    getCropBySoil(String soilType) {

        return repository
                .findBySoilType(
                        soilType);
    }
}