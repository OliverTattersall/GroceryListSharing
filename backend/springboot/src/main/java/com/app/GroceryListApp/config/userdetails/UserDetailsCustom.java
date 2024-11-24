package com.app.GroceryListApp.config.userdetails;

import com.app.GroceryListApp.models.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

// class that security needs to customize user
@NoArgsConstructor
@Data
public class UserDetailsCustom implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String id;
    private String username;
    private String email;

    @JsonIgnore
    private String password;

    private boolean is2faEnabled = false;

    // will give authorities to users so they can use endpoints
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsCustom(String id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // convert userEntity into UserDetailImpl
    // maybe I could just store a user reference instead??
    public static UserDetailsCustom build(User user) {

        return new UserDetailsCustom(
                user.getId(),
                user.getDisplayName(),
                user.getEmail(),
                user.getPassword()
        );
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return id;
    } // use id in place of username everywhere

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean is2faEnabled() {
        return is2faEnabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsCustom user = (UserDetailsCustom) o;
        return Objects.equals(id, user.id);
    }
}
