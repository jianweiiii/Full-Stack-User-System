package com.example.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private final String testBean;

    public HelloController(String testBean){
        this.testBean = testBean;
    }

    @GetMapping("/hello")
    public String sayHello(){
        System.out.println("controller hit!");
        return testBean;

    }
}
