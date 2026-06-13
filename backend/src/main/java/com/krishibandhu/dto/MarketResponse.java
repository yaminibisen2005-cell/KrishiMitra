package com.krishibandhu.dto;

public class MarketResponse {

    private String crop;
    private String market;
    private String state;
    private String price;

    public MarketResponse() {
    }

    public MarketResponse(
            String crop,
            String market,
            String state,
            String price) {

        this.crop = crop;
        this.market = market;
        this.state = state;
        this.price = price;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}