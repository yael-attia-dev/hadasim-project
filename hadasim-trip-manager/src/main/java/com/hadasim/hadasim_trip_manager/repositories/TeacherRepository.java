package com.hadasim.hadasim_trip_manager.repositories;

import com.hadasim.hadasim_trip_manager.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//all the function from JpaRepository, the object type is teacher, the key is String.

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {


}