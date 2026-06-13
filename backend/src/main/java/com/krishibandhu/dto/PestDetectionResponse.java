package com.krishibandhu.dto;

public class PestDetectionResponse {

    private String cropName;
    private String pestName;
    private String severity;
    private String treatment;

    public PestDetectionResponse() {
    }

    public PestDetectionResponse(
            String cropName,
            String pestName,
            String severity,
            String treatment) {

        this.cropName = cropName;
        this.pestName = pestName;
        this.severity = severity;
        this.treatment = treatment;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getPestName() {
        return pestName;
    }

    public void setPestName(String pestName) {
        this.pestName = pestName;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
}