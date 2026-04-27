package com.hadasim.hadasim_trip_manager.repositories;

import com.hadasim.hadasim_trip_manager.entities.StudentLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<StudentLocation, Long> {

    List<StudentLocation> findByStudentIdOrderByTimestampDesc(String studentId);
}