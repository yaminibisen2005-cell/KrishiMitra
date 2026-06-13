package com.krishibandhu.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.krishibandhu.dto.WeatherResponse;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    public WeatherResponse getCurrentWeather(String city) {

        String url =
                "https://api.openweathermap.org/data/2.5/weather?q="
                + city
                + "&appid="
                + apiKey
                + "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> response =
                restTemplate.getForObject(
                        url,
                        Map.class);

        if (response == null) {
            throw new RuntimeException(
                    "Unable to fetch weather data");
        }

        Map<String, Object> main =
                (Map<String, Object>) response.get("main");

        Double temperature =
                ((Number) main.get("temp"))
                .doubleValue();

        Integer humidity =
                ((Number) main.get("humidity"))
                .intValue();

        List<Map<String, Object>> weatherList =
                (List<Map<String, Object>>)
                response.get("weather");

        String condition =
                weatherList.get(0)
                .get("main")
                .toString();

        String advisory;

        if (condition.equalsIgnoreCase("Rain")) {

            advisory =
                    "Rain expected. Avoid pesticide spraying and fertilizer application.";

        } else if (temperature >= 35) {

            advisory =
                    "High temperature detected. Increase irrigation and avoid afternoon field work.";

        } else if (humidity >= 80) {

            advisory =
                    "High humidity. Monitor crops for fungal diseases.";

        } else if (condition.equalsIgnoreCase("Clouds")) {

            advisory =
                    "Cloudy weather. Suitable for most farming activities.";

        } else {

            advisory =
                    "Weather conditions are normal for farming operations.";
        }

        WeatherResponse weatherResponse =
                new WeatherResponse();

        weatherResponse.setCity(city);
        weatherResponse.setTemperature(temperature);
        weatherResponse.setHumidity(humidity);
        weatherResponse.setCondition(condition);
        weatherResponse.setAdvisory(advisory);

        return weatherResponse;
    }
}