package com.krishibandhu.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.krishibandhu.dto.PestDetectionResponse;
import com.krishibandhu.entity.PestDetection;
import com.krishibandhu.repository.PestDetectionRepository;

@Service
public class PestDetectionService {

    private final PestDetectionRepository repository;
    private final GeminiService geminiService;

    public PestDetectionService(
            PestDetectionRepository repository,
            GeminiService geminiService) {

        this.repository = repository;
        this.geminiService = geminiService;
    }

    public PestDetection saveDetection(
            PestDetection pestDetection) {

        pestDetection.setDetectedAt(
                LocalDateTime.now());

        return repository.save(
                pestDetection);
    }

    public List<PestDetection> getAllDetections() {

        return repository.findAll();
    }

    public List<PestDetection> getByUser(
            Long userId) {

        return repository.findByUserId(
                userId);
    }

    public PestDetectionResponse detectPest(
            Long userId,
            String imageUrl) {

        String aiResponse =
                geminiService.detectPest(
                        imageUrl);

        // Dummy values for now
        String cropName = "Cotton";
        String pestName = "Aphids";
        String severity = "Medium";
        String treatment = "Spray Neem Oil";

        PestDetection pest =
                new PestDetection();

        pest.setUserId(userId);
        pest.setImageUrl(imageUrl);
        pest.setCropName(cropName);
        pest.setPestName(pestName);
        pest.setSeverity(severity);
        pest.setTreatment(treatment);

        saveDetection(pest);

        return new PestDetectionResponse(
                cropName,
                pestName,
                severity,
                treatment);
    }
}