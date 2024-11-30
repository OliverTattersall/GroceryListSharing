package com.app.GroceryListApp.models.dtos;

import com.app.GroceryListApp.models.entities.GList;
import com.app.GroceryListApp.models.entities.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class UserInfoDTO {
    private String id;
    private String displayName;
    private String email;
    private boolean emailVerified = false;
    private String password;
    private List<ListUser> friends;
    private List<String> lists ;
}
