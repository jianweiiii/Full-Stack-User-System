package com.example.backend.dto;

import com.example.backend.constant.Role;

public class AdminUserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;

    public AdminUserResponse(){

    }

    public AdminUserResponse(Long id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
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

    public Role getRole() {
        return role;
    }
}
