package com.hadasim.hadasim_trip_manager.services;

import com.hadasim.hadasim_trip_manager.entities.Student;
import com.hadasim.hadasim_trip_manager.repositories.StudentRepository;
import com.hadasim.hadasim_trip_manager.entities.Teacher;
import com.hadasim.hadasim_trip_manager.repositories.TeacherRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public TeacherService(TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    /**
     * this method adds a new teacher
     * it checks if the teacher ID already exists to avoid overwriting data
     */
    public Teacher addTeacher(Teacher newTeacher) {
        // Check if teacher ID is already in the Database
        if (teacherRepository.existsById(newTeacher.getId())) {
            throw new RuntimeException("You are updating teacher with id " + newTeacher.getId()+"!");
        }
        // Save the new teacher
        return teacherRepository.save(newTeacher);
    }

    /**
     * this method updates an existing teacher
     * it only works if the teacher ID is already in the database
     */
    public Teacher updateTeacher(Teacher teacher) {
        // check if teacher exists before updating
        if (teacherRepository.existsById(teacher.getId())) {
            return teacherRepository.save(teacher);
        } else {
            throw new EntityNotFoundException("Cannot update. Teacher not found.");
        }
    }

    /**
     * this method returns a list of all teachers from the database
     */
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }


    /**
     * this method deletes a teacher by their ID
     * it checks if the teacher exists before trying to delete
     */
    public void deleteTeacher(String id) {
        //check if the teacher exists
        if (teacherRepository.existsById(id)) {
            //delete the teacher
            teacherRepository.deleteById(id);
        } else {
            //throw an error if not found
            throw new EntityNotFoundException("Cannot delete. Teacher with ID " + id + " not found.");
        }
    }

    /**
     * this method returns a specific teacher by id
     */
    public Teacher getTeacherById(String id) {
        // we search for the teacher. findById returns an "Optional" container.
        return teacherRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Teacher with ID " + id + " not found."));
    }

    /* check if teacher exists and password matches */
    public boolean login(String id, String password) {
        /* find the teacher by id */
        return teacherRepository.findById(id)
                .map(teacher -> teacher.getPassword().equals(password))
                .orElse(false); /* return false if teacher not found or password wrong */
    }


    /* get all students for a specific teacher based on her classroom */
    public List<Student> getMyStudents(String teacherId) {
        /*  find the teacher */
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("teacher not found"));

        /*  get her classroom name */
        String classroomName = teacher.getClassroom();

        /*  return all students in that classroom from the student repository */
        return studentRepository.findByClassroom(classroomName);
    }
}
