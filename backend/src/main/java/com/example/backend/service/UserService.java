package com.example.backend.service;


import com.example.backend.constant.Role;
import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.InvalidCredentialsException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repo.UserRepo;
import com.example.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponse register(RegisterRequest request){
        if(userRepo.findByEmail(request.getEmail()).isPresent() ){
            throw new EmailAlreadyExistsException("Email already Exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepo.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }


    public LoginResponse login(LoginRequest request){
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Invalid Email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    public UserResponse getCurrentUser(String email){
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }


    public List<AdminUserResponse> getAllUsers(){
        return userRepo.findAll()
                .stream()
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();
    }

    public AdminUserResponse updateUser(Long id, UpdateUserRequest request){
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        User updatedUser = userRepo.save(user);

        return new AdminUserResponse(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getRole()
        );
    }

    public void deleteUser(Long id){
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepo.delete(user);
    }
}
