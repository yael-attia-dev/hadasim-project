package com.hadasim.hadasim_trip_manager.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Teacher {

    @Id
    @NotBlank(message = "id is mandatory")
    private String id;

    @NotBlank(message = "first name is mandatory")
    @Size(min = 2, message = "name is too short")
    private String firstName;

    @NotBlank(message = "last name is mandatory")
    private String lastName;

    @NotBlank(message = "Classroom is mandatory")
    @Pattern(regexp = "^[A-Z][0-9]$")
    private String classroom;

    @NotBlank(message = "password is mandatory")
    @Size(min = 4, message = "password must be at least 4 characters")
    /* teacher password for login */
    private String password;



    public Teacher() {
    }

    /* constructor to create teacher with data */
    public Teacher(String id, String firstName, String lastName, String classroom, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.classroom = classroom;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
