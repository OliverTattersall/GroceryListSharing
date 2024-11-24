package com.app.GroceryListApp.models.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListUser {

    private String id;

    private String name;
}
