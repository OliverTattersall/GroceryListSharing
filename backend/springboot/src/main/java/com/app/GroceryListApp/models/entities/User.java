package com.app.GroceryListApp.models.entities;

import com.app.GroceryListApp.models.dtos.ListUser;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;

    private String displayName;

    private String email;

    private boolean emailVerified = false;

    private String password;

    private List<ListUser> friends = new ArrayList<>();

    @DocumentReference(lazy = true)
    private List<GList> lists = new ArrayList<>();

    public User(String displayName, String email, String password){
        this.displayName = displayName;
        this.email = email;
        this.password = password;
    }

    public void addList(GList list){
        lists.add(list);
    }

}
