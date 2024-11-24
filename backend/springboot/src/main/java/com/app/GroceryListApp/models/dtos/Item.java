package com.app.GroceryListApp.models.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Item {

    @NotBlank()
    private String item;

    @NotBlank()
    private String quantity;
}
