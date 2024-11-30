package com.app.GroceryListApp.controllers;

import com.app.GroceryListApp.config.jwt.JwtUtils;
import com.app.GroceryListApp.models.dtos.LoginRequest;
import com.app.GroceryListApp.models.dtos.SignUpRequest;
import com.app.GroceryListApp.models.dtos.UserInfoDTO;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.services.UserService;
import com.app.GroceryListApp.util.Mapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder; // this will be set in Security config
    @Autowired
    UserService userService;

    @PostMapping("/public/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        log.info("Registering user");
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), // make sure to import own model not built in
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/public/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest){
        return userService.signIn(loginRequest);
    }

    // delete this
    @GetMapping("/public/getuserbyemail")
    public ResponseEntity<UserInfoDTO> getByEmail(@RequestParam String email){
        return ResponseEntity.ok(Mapper.toUserInfoDTO(userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found by that email"))));
    }

}
