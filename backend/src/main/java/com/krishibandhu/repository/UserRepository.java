package com.krishibandhu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krishibandhu.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMobile(String mobile);

}