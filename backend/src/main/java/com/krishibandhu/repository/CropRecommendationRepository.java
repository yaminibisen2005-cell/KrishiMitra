package com.krishibandhu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krishibandhu.entity.CropRecommendation;

public interface CropRecommendationRepository
        extends JpaRepository<CropRecommendation, Long> {

    List<CropRecommendation>
    findBySoilType(String soilType);

    List<CropRecommendation>
    findBySeason(String season);

    List<CropRecommendation>
    findBySoilTypeAndSeason(
            String soilType,
            String season);
}