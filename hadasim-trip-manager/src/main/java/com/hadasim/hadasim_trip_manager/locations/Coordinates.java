package com.hadasim.hadasim_trip_manager.locations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Coordinates {
    @JsonProperty("Longitude")
    private DMSLocation longitude;
    @JsonProperty("Latitude")
    private DMSLocation latitude;

    public Coordinates() {}

    public Coordinates(DMSLocation longitude, DMSLocation latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public DMSLocation getLongitude() { return longitude; }
    public void setLongitude(DMSLocation longitude) { this.longitude = longitude; }
    public DMSLocation getLatitude() { return latitude; }
    public void setLatitude(DMSLocation latitude) { this.latitude = latitude; }
}
