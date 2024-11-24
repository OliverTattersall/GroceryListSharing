package com.app.GroceryListApp.models.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest { // format for a login request
    private String email;

    private String password;

}

