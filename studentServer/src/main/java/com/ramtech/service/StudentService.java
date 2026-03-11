package com.ramtech.service;

import com.ramtech.model.Student;
import com.ramtech.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public Student addStudent(Student student){
        return repo.save(student);
    }

    public List<Student> getAllStudents(){
        return repo.findAll();
    }

    public Student getStudentById(Long id){
        return repo.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student student){

        Student s = repo.findById(id).orElse(null);

        s.setName(student.getName());
        s.setEmail(student.getEmail());
        s.setCity(student.getCity());

        return repo.save(s);
    }

    public String deleteStudent(Long id){
        repo.deleteById(id);
        return "Student deleted successfully";
    }
}