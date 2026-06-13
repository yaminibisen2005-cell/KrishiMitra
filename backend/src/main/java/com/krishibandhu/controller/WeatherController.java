package com.krishibandhu.controller;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.dto.WeatherResponse;
import com.krishibandhu.service.WeatherService;

@RestController
@RequestMapping("/api/weather")

public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(
            WeatherService weatherService) {

        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public WeatherResponse getCurrentWeather(
            @RequestParam String city) {

        return weatherService
                .getCurrentWeather(city);
    }
}