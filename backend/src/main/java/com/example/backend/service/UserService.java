package com.example.backend.service;


import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(RegisterRequest request){
        if(userRepo.findByEmail(request.getEmail()).isPresent() ){
            throw new EmailAlreadyExistsException("Email already Exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepo.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getPassword()
        );
    }
}
