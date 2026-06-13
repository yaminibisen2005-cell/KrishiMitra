package com.krishibandhu.dto;

public class WeatherResponse {

    private String city;
    private Double temperature;
    private Integer humidity;
    private String condition;
    private String advisory;

    public WeatherResponse() {
    }

    public WeatherResponse(
            String city,
            Double temperature,
            Integer humidity,
            String condition,
            String advisory) {

        this.city = city;
        this.temperature = temperature;
        this.humidity = humidity;
        this.condition = condition;
        this.advisory = advisory;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getAdvisory() {
        return advisory;
    }

    public void setAdvisory(String advisory) {
        this.advisory = advisory;
    }
}