package com.krishibandhu.controller;
import com.krishibandhu.service.ChatService;
import org.springframework.web.bind.annotation.*;

import com.krishibandhu.dto.ChatRequest;
import com.krishibandhu.dto.ChatResponse;

@RestController
@RequestMapping("/api/chat")

public class ChatController {

    private final ChatService chatService;

    public ChatController(
            ChatService chatService) {

        this.chatService = chatService;
    }

    @PostMapping("/ask")
    public ChatResponse ask(
            @RequestBody ChatRequest request) {

        return chatService
                .ask(request.getQuestion());
    }
}