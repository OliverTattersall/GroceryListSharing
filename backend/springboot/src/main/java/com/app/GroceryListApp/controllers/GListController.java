package com.app.GroceryListApp.controllers;

import com.app.GroceryListApp.config.userdetails.UserDetailsCustom;
import com.app.GroceryListApp.models.dtos.Item;
import com.app.GroceryListApp.models.dtos.NewListRequest;
import com.app.GroceryListApp.models.entities.GList;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.UserRepository;
import com.app.GroceryListApp.services.GListService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lists")
@Slf4j
public class GListController {

    @Autowired
    GListService gListService;

    @Autowired
    UserRepository userRepository;


    @GetMapping()
    public ResponseEntity<?> getUserLists(@AuthenticationPrincipal UserDetailsCustom userDetailsCustom){
        try{
            return ResponseEntity.ok(gListService.getLists(userDetailsCustom.getUser()));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/newlist")
    public ResponseEntity<String> newList(@RequestBody @Valid NewListRequest listRequest,
                                          @AuthenticationPrincipal UserDetailsCustom userDetails){
        log.info("Creating new list for user {}", userDetails.getDisplayName());
        GList newList = new GList(listRequest.getListName(), userDetails.getUser());
        gListService.createList(newList, userDetails.getUser());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/addItem")
    public ResponseEntity<String> addItemToList(@RequestParam @NotBlank String listId,
                                                @RequestBody @Valid Item item,
                                                @AuthenticationPrincipal UserDetailsCustom userDetailsCustom
                                                ){
        log.info("Adding item to list {}", listId);
        try{
            gListService.addItemToList(listId, item, userDetailsCustom.getUser());
            return ResponseEntity.ok("Successfully added item");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/addFriendToList")
    public ResponseEntity<String> addFriendToList(@RequestParam @NotBlank String listId,
                                                  @RequestParam @NotBlank String friendId,
                                                  @AuthenticationPrincipal UserDetailsCustom userDetailsCustom
                                                  ){
        try{
            gListService.addFriendToList(listId, friendId, userDetailsCustom.getUser());
            return ResponseEntity.ok("Successfully added friend tolist");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
