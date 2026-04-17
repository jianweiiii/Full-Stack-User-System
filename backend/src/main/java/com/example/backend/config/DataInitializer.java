package com.example.backend.config;

import com.example.backend.entity.User;
import com.example.backend.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setName("User One");
            user1.setEmail("user1@test.com");
            user1.setPassword(passwordEncoder.encode("password123"));

            User user2 = new User();
            user2.setName("User Two");
            user2.setEmail("user2@test.com");
            user2.setPassword(passwordEncoder.encode("password123"));

            User user3 = new User();
            user3.setName("User Three");
            user3.setEmail("user3@test.com");
            user3.setPassword(passwordEncoder.encode("password123"));

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
        }
    }
}