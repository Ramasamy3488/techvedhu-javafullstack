package com.ramtech.controller;

import com.ramtech.model.Course;
import com.ramtech.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    // CREATE
    @PostMapping
    public Course addCourse(@RequestBody Course course){
        return service.addCourse(course);
    }

    // READ ALL
    @GetMapping
    public List<Course> getAllCourses(){
        return service.getAllCourses();
    }

   // UPDATE
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course){
        return service.updateCourse(id, course);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id){
        return service.deleteCourse(id);
    }
}