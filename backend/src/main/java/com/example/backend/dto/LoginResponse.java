package com.example.backend.dto;

public class LoginResponse {

    private String message;
    private String token;
    private Long id;
    private String name;
    private String email;

    public LoginResponse(String message, String token, Long id, String email, String name) {
        this.message = message;
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
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
