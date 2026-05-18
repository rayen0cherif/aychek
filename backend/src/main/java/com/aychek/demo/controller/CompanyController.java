package com.aychek.demo.controller;

import com.aychek.demo.model.Company;
import com.aychek.demo.service.CompanyService;
import com.aychek.demo.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aychek.demo.dto.AskRequest;
import com.aychek.demo.dto.AskResponse;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    private final CompanyService companyService;
    private final AiService aiService;

    public CompanyController(CompanyService companyService, AiService aiService) {
        this.companyService = companyService;
        this.aiService = aiService;
    }

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable UUID id) {
        return companyService.getCompanyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/ask")
    public ResponseEntity<AskResponse> askCompanyQuestion(
            @PathVariable UUID id,
            @RequestBody AskRequest request) {

        return companyService.getCompanyById(id)
                .map(company -> {
                    String answer = aiService.askQuestionAboutCompany(company, request.question());
                    return ResponseEntity.ok(new AskResponse(answer));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
