package com.ramtech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ramtech.dto.EnrollmentDTO;
import com.ramtech.service.EnrollmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService service;


    // CREATE (Assign Course)
    @PostMapping
    public EnrollmentDTO assignCourse(@RequestBody EnrollmentDTO dto){

        return service.assignCourse(
                dto.getStudentId(),
                dto.getCourseId(),
                dto.getMarks()
        );
    }


    // READ ALL
    @GetMapping
    public List<EnrollmentDTO> getAllEnrollments(){
        return service.getAllEnrollments();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public EnrollmentDTO getEnrollmentById(@PathVariable Long id){
        return service.getEnrollmentById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public EnrollmentDTO updateEnrollment(
            @PathVariable Long id,
            @RequestBody EnrollmentDTO dto){

        return service.updateEnrollment(
                id,
                dto.getStudentId(),
                dto.getCourseId(),
                dto.getMarks()
        );
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteEnrollment(@PathVariable Long id){
        return service.deleteEnrollment(id);
    }

}