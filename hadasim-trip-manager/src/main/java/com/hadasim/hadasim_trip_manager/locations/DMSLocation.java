package com.hadasim.hadasim_trip_manager.locations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DMSLocation {

    @JsonProperty("Degrees")
    private String degrees;
    @JsonProperty("Minutes")
    private String minutes;
    @JsonProperty("Seconds")
    private String seconds;

    // Default Constructor
    public DMSLocation() {}

    public DMSLocation(String degrees, String minutes, String seconds) {
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    // Getters and Setters
    public String getDegrees() { return degrees; }
    public void setDegrees(String degrees) { this.degrees = degrees; }
    public String getMinutes() { return minutes; }
    public void setMinutes(String minutes) { this.minutes = minutes; }
    public String getSeconds() { return seconds; }
    public void setSeconds(String seconds) { this.seconds = seconds; }
}
