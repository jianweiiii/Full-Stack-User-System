package com.example.backend.exception;

import com.example.backend.entity.User;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}
