package com.app.GroceryListApp.services;

import com.app.GroceryListApp.config.userdetails.UserDetailsCustom;
import com.app.GroceryListApp.models.dtos.GListDTO;
import com.app.GroceryListApp.models.dtos.Item;
import com.app.GroceryListApp.models.dtos.ListUser;
import com.app.GroceryListApp.models.entities.GList;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.GListRepository;
import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.util.Mapper;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
public class GListService {

    @Autowired
    GListRepository gListRepository;
    @Autowired
    UserRepository userRepository;

    public List<GListDTO> getLists(User user){
        return user.getLists().stream().map(Mapper::toGListDTO).toList();
//        return new ArrayList<GList>();
    }

    public void createList(GList newList, User user){
        user.addList(newList);
        gListRepository.insert(newList);

        userRepository.save(user);
    }

    public void addItemToList(String listId, Item newItem, User user){
        if(!user.getLists().stream().map(GList::getId).toList().contains(listId)){
            throw new RuntimeException("User does not have access to this list");
        }
        GList list = gListRepository.findById(listId).orElseThrow(() -> new RuntimeException("List does not exists"));
        list.addItem(newItem);
        gListRepository.save(list);
    }

    public void addFriendToList(String listId, String friendId, User user){
        if(!user.getFriends().stream().map(ListUser::getUserId).toList().contains(friendId)){
            throw new RuntimeException("That is not a friend");
        }
        GList list = gListRepository.findById(listId).orElseThrow(() -> new RuntimeException("List does not exists"));
        if(!list.getOwner().getUserId().equals(user.getId())){
            throw new RuntimeException("You do not have the permission to modify this list");
        }
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend does not exist"));
        list.addPerson(friend);
        friend.addList(list);
        gListRepository.save(list);
        userRepository.save(friend);
    }
}
