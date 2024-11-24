package com.app.GroceryListApp.config;

import com.app.GroceryListApp.config.jwt.AuthEntryPointJwt;
import com.app.GroceryListApp.config.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    @Value("${frontend.url}")
    private String frontendUrl;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter(){
        return new AuthTokenFilter();
    }
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf((csrf) -> csrf.disable())
//                .csrf(csrf ->
//                                csrf.csrfTokenRepository(new CookieCsrfTokenRepository()) // this will have httpOnly
//                                        .ignoringRequestMatchers("/api/auth/public/**") // ignore csrf protection for all urls matching this
//                )
                .authorizeHttpRequests(
                        (requests) -> requests
                                .requestMatchers("/api/public/**").permitAll()
                                .requestMatchers("/api/auth/public/**").permitAll() // opens auth
                                .requestMatchers("/api/csrf-token").permitAll() // to get csrf token
//                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // can use this instead of method level. note hasRole appends ROLE_ at start
//                                .anyRequest().permitAll()
                                .anyRequest().authenticated()
                )
//                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // setting exception handling to the handler
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class) // adding jwt filter before password auth
//                .addFilterBefore(new CustomLoggingFilter(), AuthTokenFilter.class) // makes custom filter happen before authentication
//            .addFilterAfter(new RequestValidationFilter(), CustomLoggingFilter.class) // adds it right after logging, just for an example
//            .httpBasic(Customizer.withDefaults());
        ;

        return (SecurityFilterChain) http.build();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(frontendUrl));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // setting password encoder to BCrypt, now anywhere we need a password encoder, it will use that
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean // we need to make this bean so anywhere we autowire an authentication manager, it can get it from here
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
