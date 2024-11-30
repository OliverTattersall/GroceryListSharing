package com.app.GroceryListApp.models.dtos;

import com.app.GroceryListApp.models.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@Builder
public class GListDTO {
    private String id;

    private String listName;

    private List<Item> items;

    private List<String> listPeopleIds;

    private ListUser owner;
}
