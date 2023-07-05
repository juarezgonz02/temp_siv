package com.escruadronlobo.devs.sivtickets.configs;

import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.JWTTokenFIlter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class WebSecurityConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceInterface userService;

    @Autowired
    private JWTTokenFIlter filter;

    @Bean
    AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder managerBuilder
                = http.getSharedObject(AuthenticationManagerBuilder.class);

        managerBuilder
                .userDetailsService(identifier -> {
                    User user = userService.findOneByIdentifer(identifier);

                    if(user == null)
                        throw new UsernameNotFoundException("User: " + identifier + ", not found!");

                    return user;
                })
                .passwordEncoder(passwordEncoder);

        return managerBuilder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH",
                "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type",
                "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("authorization", "x-auth-token"));
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


        //Http login and cors disabled
        http.cors().and().authorizeHttpRequests().requestMatchers("/auth/**").permitAll()
                .requestMatchers("/analysis/**").hasAuthority("DATA")
<<<<<<< Updated upstream
                .requestMatchers("/event/creation**").hasAuthority("EVENTMOD")
=======
                .requestMatchers("/events/creation/**").hasAuthority("EVENTMOD")
>>>>>>> Stashed changes
                .requestMatchers("/tickets/**").hasAuthority("VALIDATION")
                .requestMatchers("/events/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic().and().csrf().disable();


    //http.authorizeHttpRequests().requestMatchers("/event/creation/**").hasAuthorityhasAuthority("EVENTMOD");


        /*
        http.authorizeHttpRequests(auth ->
                auth


        );

        * */

        //Statelessness
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        //UnAunthorized handler
        http.exceptionHandling(handling -> handling.authenticationEntryPoint((req, res, ex) -> {
            res.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Auth fail!"
            );
        }));

        //JWT filter
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}