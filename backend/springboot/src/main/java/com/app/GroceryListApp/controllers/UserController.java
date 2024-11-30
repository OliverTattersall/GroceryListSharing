package com.app.GroceryListApp.controllers;

import com.app.GroceryListApp.config.userdetails.UserDetailsCustom;
import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.services.UserService;
import com.app.GroceryListApp.util.Mapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @GetMapping("/getuser")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetailsCustom userDetails){
        log.info("Getting User info");
        log.info(userDetails.getId());
        try{
            return ResponseEntity.ok(Mapper.toUserInfoDTO(userService.fetchUserById(userDetails.getId())));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
