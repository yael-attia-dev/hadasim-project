package com.hadasim.hadasim_trip_manager.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Student {

    @Id
    @NotBlank(message = "id is mandatory")
    /* student unique id number */
    private String id;


    @NotBlank(message = "first name is mandatory")
    @Size (min = 2, message = "name is too short")
    /* student first name */
    private String firstName;

    @NotBlank(message = "last name is mandatory")
    /* student last name */
    private String lastName;

    @NotBlank(message = "Classroom is mandatory")
    @Pattern(regexp = "^[A-Z][0-9]$")
    /* student class name like a1 or b2 */
    private String classroom;

    public Student(String id, String firstName, String lastName, String classroom) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.classroom = classroom;
    }

    public Student() {
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
