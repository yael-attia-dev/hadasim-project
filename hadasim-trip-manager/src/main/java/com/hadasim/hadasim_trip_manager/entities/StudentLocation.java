package com.hadasim.hadasim_trip_manager.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
/* this class represents the table in SQL Server */
public class StudentLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String studentId;
    private String latitude;
    private String longitude;
    private LocalDateTime timestamp;

    // קונסטרקטור ריק חובה ל-JPA
    public StudentLocation() {}

    // קונסטרקטור נוח לעבודה
    public StudentLocation(String studentId, String latitude, String longitude, LocalDateTime timestamp) {
        this.studentId = studentId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}