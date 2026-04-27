package com.hadasim.hadasim_trip_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
import com.hadasim.hadasim_trip_manager.entities.Teacher;
import com.hadasim.hadasim_trip_manager.services.TeacherService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin
public class TeacherController {

    private final TeacherService teacherService;

    // Constructor Injection
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    /**
     * Get all teachers
     */
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    /**
     * Get teacher by ID
     */
    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable String id) {
        return teacherService.getTeacherById(id);
    }

    /**
     * Add a new teacher
     */
    @PostMapping
    public Teacher addTeacher( @Valid @RequestBody Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    /**
     * Update an existing teacher
     */
    @PutMapping
    public Teacher updateTeacher( @Valid @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(teacher);
    }

    /**
     * Delete a teacher
     */
    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable String id) {
        teacherService.deleteTeacher(id);
    }

    /* check teacher login credentials */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("id");
        String password = loginData.get("password");

        /* check if credentials are correct using the service */
        boolean isValid = teacherService.login(id, password);

        if (isValid) {
            return ResponseEntity.ok("login success");
        } else {
            /* return error if password or id is wrong */
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid id or password");
        }
    }
}
