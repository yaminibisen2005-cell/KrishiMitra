package com.krishibandhu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.krishibandhu.dto.ChatResponse;
import com.krishibandhu.entity.ChatHistory;
import com.krishibandhu.entity.CropRecommendation;
import com.krishibandhu.enums.IntentType;
import com.krishibandhu.repository.ChatHistoryRepository;

@Service
public class ChatService {

    private final GeminiService geminiService;
    private final IntentService intentService;
    private final ChatHistoryRepository chatHistoryRepository;
    private final CropRecommendationService cropService;
  

    public ChatService(
            GeminiService geminiService,
            IntentService intentService,
            ChatHistoryRepository chatHistoryRepository,
            CropRecommendationService cropService) {

        this.geminiService = geminiService;
        this.intentService = intentService;
        this.chatHistoryRepository = chatHistoryRepository;
        this.cropService = cropService;
       
    }

    public ChatResponse ask(String question) {

        IntentType intent =
                intentService.detectIntent(question);

        String answer;

        switch (intent) {

          
            case CROP:

                List<CropRecommendation> crops =
                        cropService.getCropBySoil("Black Soil");

                if (crops.isEmpty()) {

                    answer =
                            "No crop recommendations found.";
                } else {

                    StringBuilder sb =
                            new StringBuilder();

                    sb.append("Recommended Crops:\n\n");

                    for (CropRecommendation crop : crops) {

                        sb.append("Crop: ")
                          .append(crop.getCropName())
                          .append("\nSeason: ")
                          .append(crop.getSeason())
                          .append("\n\n");
                    }

                    answer = sb.toString();
                }

                break;

            default:

                answer =
                        geminiService.askGemini(question);
        }

        ChatHistory history =
                new ChatHistory();

        history.setQuestion(question);
        history.setAnswer(answer);

        chatHistoryRepository.save(history);

        return new ChatResponse(answer);
    }

}