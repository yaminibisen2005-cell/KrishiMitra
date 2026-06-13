package com.krishibandhu.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.krishibandhu.entity.User;
import com.krishibandhu.repository.UserRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String mobile)
            throws UsernameNotFoundException {

        User user =
                userRepository
                .findByMobile(mobile)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User Not Found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getMobile())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}