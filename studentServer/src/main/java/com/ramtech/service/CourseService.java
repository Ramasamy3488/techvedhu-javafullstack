package com.ramtech.service;

import com.ramtech.model.Course;
import com.ramtech.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository repo;

    public Course addCourse(Course course){
        return repo.save(course);
    }

    public List<Course> getAllCourses(){
        return repo.findAll();
    }



    public Course updateCourse(Long id, Course course){

        Course c = repo.findById(id).orElse(null);

        c.setCourseName(course.getCourseName());
        c.setFees(course.getFees());

        return repo.save(c);
    }

    public String deleteCourse(Long id){
        repo.deleteById(id);
        return "Course deleted successfully";
    }

}