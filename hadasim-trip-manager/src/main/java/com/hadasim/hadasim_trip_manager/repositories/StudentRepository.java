package com.hadasim.hadasim_trip_manager.repositories;

import com.hadasim.hadasim_trip_manager.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//all the function from JpaRepository, the object type is student, the key is String.

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    /* find all students by classroom name */
    List<Student> findByClassroom(String classroom);


}


