package com.example.backend.controller;


import com.example.backend.dto.AdminUserResponse;
import com.example.backend.dto.UpdateUserRequest;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService){
        this.userService = userService;
    }


    @GetMapping
    public List<AdminUserResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public AdminUserResponse updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request){
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
