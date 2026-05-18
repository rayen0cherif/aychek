package com.aychek.demo.service;

import com.aychek.demo.model.Company;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {

    private final RestClient restClient;

    @Value("${groq.api.model}")
    private String model;

    public AiService(@Value("${groq.api.url}") String apiUrl,
            @Value("${groq.api.key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String askQuestionAboutCompany(Company company, String question) {
        String systemPrompt = String.format("""
                You are an assistant specialized in company analysis.

                Your task:
                - Answer questions ONLY using the provided company information.
                - Do not invent facts, numbers, partnerships, products, or history.
                - If the answer is not clearly present in the provided data, say:
                  "I don't have enough information to answer that accurately."

                Response rules:
                - Keep answers concise and professional.
                - Maximum 3 short paragraphs.
                - Avoid bullet points unless necessary.
                - Do not repeat all company details unnecessarily.
                - If the user asks what the company does, summarize its activity clearly.

                Company Information:
                {
                  "name": "%s",
                  "sector": "%s",
                  "country": "%s",
                  "foundedYear": %d,
                  "employeeCount": %d,
                  "description": "%s"
                }
                """,
                company.getName(),
                company.getSector(),
                company.getCountry(),
                company.getFoundedYear(),
                company.getEmployeeCount(),
                company.getDescription());

        String userPrompt = String.format("User question: \"%s\" Answer briefly in 2-3 sentences.", question);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user", "content", userPrompt)));

        try {
            Map<String, Object> response = restClient.post()
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
            return "Sorry, I couldn't generate an answer at this time.";
        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred while contacting the AI service: " + e.getMessage();
        }
    }
}
