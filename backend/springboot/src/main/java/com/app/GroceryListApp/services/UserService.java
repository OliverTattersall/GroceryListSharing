package com.app.GroceryListApp.services;

import com.app.GroceryListApp.config.jwt.JwtUtils;
import com.app.GroceryListApp.models.dtos.ListUser;
import com.app.GroceryListApp.models.dtos.LoginRequest;
import com.app.GroceryListApp.models.dtos.LoginResponse;
import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthenticationManager authenticationManager;
    public ResponseEntity<?> signIn(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())); // we want plaintext password here
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }
//      set the authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal(); // equivalent to @AuthenticationPrincipal

        String jwtToken = jwtUtils.generateTokenFromId(userDetails); // generateToken

        // Prepare the response body, now including the JWT token directly in the body
        LoginResponse response = new LoginResponse(userDetails.getUsername(), jwtToken);

        // Return the response entity with the JWT token included in the response body
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtToken).body(response);
    }

    public User fetchUserById(String id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Cannot find user by this id"));
    }

    public void addFriend(User user, String friendId) throws RuntimeException{
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend does not exist"));
        user.getFriends().add(ListUser.builder().userId(friendId).name(friend.getDisplayName()).build());
        friend.getFriends().add(ListUser.builder().userId(user.getId()).name(user.getDisplayName()).build());
        userRepository.save(user);
        userRepository.save(friend);
    }
}
