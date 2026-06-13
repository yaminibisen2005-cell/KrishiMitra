package com.krishibandhu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krishibandhu.entity.ChatHistory;

public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {

}