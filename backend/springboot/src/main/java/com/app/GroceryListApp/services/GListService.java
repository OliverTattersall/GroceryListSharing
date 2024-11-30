package com.app.GroceryListApp.services;

import com.app.GroceryListApp.models.dtos.GListDTO;
import com.app.GroceryListApp.models.entities.GList;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.GListRepository;
import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
