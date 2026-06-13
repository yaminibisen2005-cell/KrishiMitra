package com.krishibandhu.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krishibandhu.dto.MarketResponse;

@Service
public class MarketService {

    @Value("${market.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate =
            new RestTemplate();

    public MarketResponse getMarketPrice(
            String crop) {

        try {

            String url =
                    "https://api.data.gov.in/resource/"
                    + "9ef84268-d588-465a-a308-a864a43d0070"
                    + "?api-key=" + apiKey
                    + "&format=json"
                    + "&limit=100"
                    + "&filters[commodity]=" + crop;

            String response =
                    restTemplate.getForObject(
                            url,
                            String.class);

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response);

            JsonNode records =
                    root.get("records");

            if (records != null &&
                    records.size() > 0) {

                JsonNode record =
                        records.get(0);

                return new MarketResponse(
                        record.get("commodity").asText(),
                        record.get("market").asText(),
                        record.get("state").asText(),
                        record.get("modal_price").asText());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new MarketResponse(
                crop,
                "Not Found",
                "Not Found",
                "0");
    }
}