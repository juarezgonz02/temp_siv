package com.escruadronlobo.devs.sivtickets.utils;

import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JWTTokenFIlter extends OncePerRequestFilter {

    @Autowired
    JWTTools jwtTools;

    @Autowired
    UserServiceInterface userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String tokenHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if(tokenHeader != null && tokenHeader.startsWith("Bearer ") && tokenHeader.length() > 7) {
            token = tokenHeader.substring(7);


            try {
                username = jwtTools.getUsernameFrom(token);
                System.out.println(username);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT TOKEN has expired");
            } catch (MalformedJwtException e) {
                System.out.println("JWT Malformado");
            } catch (UnsupportedJwtException e){
                System.out.println("JWT DE GOOGLE");
            }
        } else {
            System.out.println("Bearer string not found");
        }

        if(username != null && token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.findOneByEmail(username);

            System.out.println(user);

            if(user != null) {
                Boolean tokenValidity = userService.isTokenValid(user, token);

                if(tokenValidity) {
                    //Preparing the authentication token.
                    UsernamePasswordAuthenticationToken authToken
                            = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    //This line, sets the user to security context to be handled by the filter chain
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

}