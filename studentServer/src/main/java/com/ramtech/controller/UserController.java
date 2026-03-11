package com.ramtech.controller;

import com.ramtech.model.User;
import com.ramtech.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    // REGISTER USER
    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    // LOGIN USER
    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User user){
        return userService.login(user);
    }

}