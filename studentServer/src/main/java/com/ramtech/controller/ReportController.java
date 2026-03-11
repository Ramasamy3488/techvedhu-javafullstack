package com.ramtech.controller;

import com.ramtech.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reports")

public class ReportController {

    @Autowired
    private ReportService reportService;


    // GET ALL REPORTS
    @GetMapping
    public List<Map<String,Object>> getAllReports(){

        return reportService.getAllReports();

    }


    // FIND BY STUDENT NAME
    @GetMapping("/student")
    public List<Map<String,Object>> findByStudentName(
            @RequestParam String name){

        return reportService.findByStudentName(name);

    }


    // SORT BY MARKS
    @GetMapping("/sort/marks")
    public List<Map<String,Object>> sortByMarks(){

        return reportService.sortByMarks();

    }

}