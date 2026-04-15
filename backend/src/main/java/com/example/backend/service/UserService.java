package com.example.backend.service;


import com.example.backend.entity.User;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.repo.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public User register(User user){
        if(userRepo.findByEmail(user.getEmail()).isPresent() ){
            throw new EmailAlreadyExistsException("Email already Exists");
        }
        return userRepo.save(user);
    }
}
