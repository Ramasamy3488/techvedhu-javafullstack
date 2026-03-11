package com.ramtech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramtech.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}