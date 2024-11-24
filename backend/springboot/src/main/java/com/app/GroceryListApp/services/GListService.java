package com.app.GroceryListApp.services;

import com.app.GroceryListApp.models.entities.GList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GListService {

    public List<GList> getLists(String userId){

        return new ArrayList<GList>();
    }
}
