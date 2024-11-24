package com.app.GroceryListApp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/health")
public class HealthController {

    @GetMapping()
    public String getHealthCheck(){
        return "ok";
    }

}
