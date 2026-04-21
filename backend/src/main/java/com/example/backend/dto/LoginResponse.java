package com.example.backend.dto;

import com.example.backend.constant.Role;

public class LoginResponse {

    private String message;
    private String token;
    private Long id;
    private String name;
    private String email;
    private Role role;

    public LoginResponse(String message, String token, Long id, String email, String name, Role role) {
        this.message = message;
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public LoginResponse(){
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
