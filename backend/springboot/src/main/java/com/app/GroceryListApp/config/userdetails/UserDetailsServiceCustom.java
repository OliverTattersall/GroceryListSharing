package com.app.GroceryListApp.config.userdetails;

import com.app.GroceryListApp.models.entities.User;
import com.app.GroceryListApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceCustom implements UserDetailsService {
    @Autowired
    UserRepository userRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // login by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return UserDetailsCustom.build(user);
    }

//    @Transactional
//    public UserDetailsCustom loadUserById(String id) throws UsernameNotFoundException{
//        // login by email
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));
//
//        return UserDetailsCustom.build(user);
//    }
}
