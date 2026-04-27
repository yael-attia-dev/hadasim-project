package com.hadasim.hadasim_trip_manager.controllers;

import com.hadasim.hadasim_trip_manager.entities.StudentLocation;
import com.hadasim.hadasim_trip_manager.locations.StudentLocationJson;
import com.hadasim.hadasim_trip_manager.repositories.LocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationRepository locationRepository;

    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateLocation(@RequestBody StudentLocationJson dto) {


        String lat = dto.getCoordinates().getLatitude().getDegrees() + "°" +
                dto.getCoordinates().getLatitude().getMinutes() + "'" +
                dto.getCoordinates().getLatitude().getSeconds() + "\"";

        String lon = dto.getCoordinates().getLongitude().getDegrees() + "°" +
                dto.getCoordinates().getLongitude().getMinutes() + "'" +
                dto.getCoordinates().getLongitude().getSeconds() + "\"";

        StudentLocation location = new StudentLocation(
                dto.getId(),
                lat,
                lon,
                LocalDateTime.now()
        );

        locationRepository.save(location);

        return ResponseEntity.ok("Location updated successfully for: " + dto.getId());
    }
}