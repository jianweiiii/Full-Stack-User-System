package com.example.backend.dto;

public class LoginResponse {

    private String message;
    private Long id;
    private String name;
    private String email;

    public LoginResponse(String message, Long id, String email, String name) {
        this.message = message;
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public LoginResponse(){
    }

    public String getMessage() {
        return message;
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
