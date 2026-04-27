package com.hadasim.hadasim_trip_manager.controllers;

import com.hadasim.hadasim_trip_manager.entities.Student;
import com.hadasim.hadasim_trip_manager.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private  final StudentService studentService;

    // Constructor Injection - This makes the yellow warning disappear
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Get all students from the database
     */
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    /**
     * Get a specific student by their ID
     */
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    /**
     * Add a new student. @RequestBody converts JSON to Student object
     */
    @PostMapping
    public Student addStudent( @Valid @RequestBody Student student) {
        return studentService.addStudent(student);
    }

    /**
     * Update an existing student
     */
    @PutMapping
    public Student updateStudent( @Valid @RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    /**
     * Delete a student by their ID
     */
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
    }

    /* get list of students in a specific class */
    @GetMapping("/class/{className}")
    public List<Student> getStudentsByClass(@PathVariable String className) {
        return studentService.getStudentsByClass(className);
    }
}
