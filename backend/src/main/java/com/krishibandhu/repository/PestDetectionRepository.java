package com.krishibandhu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krishibandhu.entity.PestDetection;


public interface PestDetectionRepository
        extends JpaRepository<PestDetection, Long> {

    List<PestDetection> findByUserId(Long userId);

    List<PestDetection> findByCropNameIgnoreCase(
            String cropName);

    List<PestDetection> findByPestNameIgnoreCase(
            String pestName);
}