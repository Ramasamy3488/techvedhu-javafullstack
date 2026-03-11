package com.ramtech.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EnrollmentDTO {

    private Long id;
    private Long studentId;
    private String studentName;
    private Long courseId;
    private String courseName;
    private int marks;

    public EnrollmentDTO() {}

    public EnrollmentDTO(Long id, Long studentId, String studentName,
                         Long courseId, String courseName, int marks) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseId = courseId;
        this.courseName = courseName;
        this.marks = marks;
    }

    // getters & setters
}