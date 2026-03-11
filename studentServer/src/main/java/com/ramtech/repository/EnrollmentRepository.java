package com.ramtech.repository;

import com.ramtech.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {

    List<Enrollment> findByStudent_NameContainingIgnoreCase(String name);

    List<Enrollment> findAllByOrderByMarksDesc();

}