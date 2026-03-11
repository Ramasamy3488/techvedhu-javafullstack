package com.ramtech.service;

import com.ramtech.model.Enrollment;
import com.ramtech.model.Student;
import com.ramtech.repository.EnrollmentRepository;
import com.ramtech.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private EnrollmentRepository enrollRepo;


    // 1️⃣ GET ALL REPORTS
    public List<Map<String,Object>> getAllReports(){

        List<Enrollment> enrollments = enrollRepo.findAll();

        List<Map<String,Object>> reports = new ArrayList<>();

        for(Enrollment e : enrollments){

            Map<String,Object> map = new HashMap<>();

            int marks = e.getMarks();
            String result = marks >= 50 ? "PASS" : "FAIL";

            map.put("studentName", e.getStudent().getName());
            map.put("email", e.getStudent().getEmail());
            map.put("courseName", e.getCourse().getCourseName());
            map.put("marks", marks);
            map.put("result", result);

            reports.add(map);
        }

        return reports;
    }


    // 2️⃣ FIND BY STUDENT NAME
    public List<Map<String,Object>> findByStudentName(String name){

        List<Enrollment> enrollments =
                enrollRepo.findByStudent_NameContainingIgnoreCase(name);

        List<Map<String,Object>> reports = new ArrayList<>();

        for(Enrollment e : enrollments){

            Map<String,Object> map = new HashMap<>();

            int marks = e.getMarks();
            String result = marks >= 50 ? "PASS" : "FAIL";

            map.put("studentName", e.getStudent().getName());
            map.put("email", e.getStudent().getEmail());
            map.put("courseName", e.getCourse().getCourseName());
            map.put("marks", marks);
            map.put("result", result);

            reports.add(map);
        }

        return reports;
    }


    // 3️⃣ SORT BY MARKS
    public List<Map<String,Object>> sortByMarks(){

        List<Enrollment> enrollments =
                enrollRepo.findAllByOrderByMarksDesc();

        List<Map<String,Object>> reports = new ArrayList<>();

        for(Enrollment e : enrollments){

            Map<String,Object> map = new HashMap<>();

            int marks = e.getMarks();
            String result = marks >= 50 ? "PASS" : "FAIL";

            map.put("studentName", e.getStudent().getName());
            map.put("email", e.getStudent().getEmail());
            map.put("courseName", e.getCourse().getCourseName());
            map.put("marks", marks);
            map.put("result", result);

            reports.add(map);
        }

        return reports;
    }

}