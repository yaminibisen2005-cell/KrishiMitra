package com.krishibandhu.controller;

import org.springframework.web.bind.annotation.*;

import com.krishibandhu.dto.MarketResponse;
import com.krishibandhu.service.MarketService;

@RestController
@RequestMapping("/api/market")

public class MarketController {

    private final MarketService marketService;

    public MarketController(
            MarketService marketService) {

        this.marketService =
                marketService;
    }

    @GetMapping("/price")
    public MarketResponse getPrice(
            @RequestParam String crop) {

        return marketService
                .getMarketPrice(crop);
    }
}