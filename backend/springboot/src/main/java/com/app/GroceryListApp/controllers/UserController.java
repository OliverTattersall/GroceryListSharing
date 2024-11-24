package com.app.GroceryListApp.controllers;

import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @GetMapping()
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetails userDetails){

        return ResponseEntity.ok(userRepository.findById(userDetails.getUsername()).orElseThrow());
    }
}
