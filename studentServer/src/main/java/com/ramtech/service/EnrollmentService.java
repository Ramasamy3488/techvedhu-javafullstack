package com.ramtech.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ramtech.dto.EnrollmentDTO;
import com.ramtech.model.Course;
import com.ramtech.model.Enrollment;
import com.ramtech.model.Student;
import com.ramtech.repository.CourseRepository;
import com.ramtech.repository.EnrollmentRepository;
import com.ramtech.repository.StudentRepository;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;


    // CREATE
    public EnrollmentDTO assignCourse(Long studentId, Long courseId, int marks){

        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setMarks(marks);

        Enrollment saved = enrollmentRepo.save(enrollment);

        return convertToDTO(saved);
    }


    // READ ALL
    public List<EnrollmentDTO> getAllEnrollments(){

        return enrollmentRepo.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // READ BY ID
    public EnrollmentDTO getEnrollmentById(Long id){

        Enrollment enrollment = enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        return convertToDTO(enrollment);
    }


    // UPDATE
    public EnrollmentDTO updateEnrollment(Long id, Long studentId, Long courseId, int marks){

        Enrollment enrollment = enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setMarks(marks);

        Enrollment updated = enrollmentRepo.save(enrollment);

        return convertToDTO(updated);
    }


    // DELETE
    public String deleteEnrollment(Long id){

        Enrollment enrollment = enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollmentRepo.delete(enrollment);

        return "Enrollment deleted successfully";
    }


    // ENTITY → DTO
    private EnrollmentDTO convertToDTO(Enrollment enrollment){

        return new EnrollmentDTO(
                enrollment.getId(),
                enrollment.getStudent().getId(),
                enrollment.getStudent().getName(),
                enrollment.getCourse().getId(),
                enrollment.getCourse().getCourseName(),
                enrollment.getMarks()
        );
    }
}