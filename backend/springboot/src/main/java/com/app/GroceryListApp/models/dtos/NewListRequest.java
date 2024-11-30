package com.app.GroceryListApp.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewListRequest{

    @NotNull()
    @NotBlank()
    private String listName;
}
