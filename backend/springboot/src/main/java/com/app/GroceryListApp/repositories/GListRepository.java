package com.app.GroceryListApp.repositories;

import com.app.GroceryListApp.models.entities.GList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GListRepository extends MongoRepository<GList, String> {

    Optional<GList> findById(String id);
}