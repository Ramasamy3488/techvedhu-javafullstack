package com.ramtech.service;

import com.ramtech.model.User;
import com.ramtech.repository.UserRepository;
import com.ramtech.config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(user);
    }

    public Map<String,String> login(User user){

        User dbUser = userRepo.findByUsername(user.getUsername());

        if(dbUser != null && passwordEncoder.matches(user.getPassword(), dbUser.getPassword())){

            String token = jwtUtil.generateToken(user.getUsername());

            Map<String,String> map = new HashMap<>();
            map.put("token", token);

            return map;
        }

        throw new RuntimeException("Invalid Username or Password");
    }

}