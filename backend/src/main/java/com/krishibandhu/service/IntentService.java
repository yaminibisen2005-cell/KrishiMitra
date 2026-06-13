package com.krishibandhu.service;

import org.springframework.stereotype.Service;

import com.krishibandhu.enums.IntentType;

@Service
public class IntentService {

    public IntentType detectIntent(String question) {

        String q = question.toLowerCase();

        if (q.contains("weather")
                || q.contains("rain")
                || q.contains("temperature")) {

            return IntentType.WEATHER;
        }

        if (q.contains("crop")
                || q.contains("soil")
                || q.contains("farming")) {

            return IntentType.CROP;
        }

        if (q.contains("price")
                || q.contains("market")
                || q.contains("mandi")) {

            return IntentType.MARKET;
        }

        return IntentType.GENERAL;
    }
}