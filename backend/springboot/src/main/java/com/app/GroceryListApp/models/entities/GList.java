package com.app.GroceryListApp.models.entities;

import com.app.GroceryListApp.models.dtos.Item;
import com.app.GroceryListApp.models.dtos.ListUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "lists")
@Data
@Builder
public class GList {

    @Id
    private String id;

    @NotNull()
    @NotBlank()
    private String listName;

    private List<Item> items;

    @DocumentReference(lazy = true)
    private List<User> listPeopleIds;

    private ListUser owner;

}
