package com.hadasim.hadasim_trip_manager.locations;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentLocationJson {

    @JsonProperty("ID")
    private String id; // ID of the student
    @JsonProperty("Coordinates")
    private Coordinates coordinates;
    @JsonProperty("Time")
    private String time;

    public StudentLocationJson() {}

    public StudentLocationJson(String id, Coordinates coordinates, String time) {
        this.id = id;
        this.coordinates = coordinates;
        this.time = time;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Coordinates getCoordinates() { return coordinates; }
    public void setCoordinates(Coordinates coordinates) { this.coordinates = coordinates; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}
