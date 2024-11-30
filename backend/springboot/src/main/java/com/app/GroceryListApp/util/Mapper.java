package com.app.GroceryListApp.util;

import com.app.GroceryListApp.models.dtos.GListDTO;
import com.app.GroceryListApp.models.dtos.UserInfoDTO;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.models.entities.GList;

import java.util.stream.Collectors;

public class Mapper {
    public static UserInfoDTO toUserInfoDTO(User user) {
        return UserInfoDTO.builder()
                .id(user.getId())
                .displayName(user.getDisplayName())
                .email(user.getEmail())
                .emailVerified(user.isEmailVerified())
                .password(user.getPassword())
                .friends(user.getFriends())
                .lists(user.getLists().stream().map(GList::getId).collect(Collectors.toList()))
                .build();
    }
    public static GListDTO toGListDTO(GList gList) {
        return GListDTO.builder()
                .id(gList.getId())
                .listName(gList.getListName())
                .items(gList.getItems())
                .listPeopleIds(gList.getListPeopleIds().stream()
                        .map(User::getId)
                        .collect(Collectors.toList()))
                .owner(gList.getOwner())
                .build();
    }
}
