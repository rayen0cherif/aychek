# Company Screener Project Plan

## Overview
This is a full-stack technical challenge for Nomow. We will build a Spring Boot backend, an Angular 18 frontend, and integrate an LLM to answer questions about companies.

## Implementation Steps

- [x] **Step 1: Setup Infrastructure**
  - [x] Use local pgAdmin database (`aychek`).
  - [x] Start database and verify connectivity.

- [ ] **Step 2: Backend Development (Spring Boot 3)**
  - [x] Bootstrap Spring Boot project (Web, JPA, PostgreSQL).
  - [x] Configure `application.yaml` with database and CORS settings.
  - [x] Create `Company` entity and `CompanyRepository`.
  - [x] Create `data.sql` with 6 seed companies.
  - [ ] Implement `CompanyController` (`GET /api/companies`, `GET /api/companies/{id}`).
  - [ ] Implement `AiService` for `POST /api/companies/{id}/ask` using Google Gemini API (or user's choice).

- [ ] **Step 3: Frontend Development (Angular 18)**
  - [ ] Initialize Angular 18 standalone project.
  - [ ] Set up global aesthetic CSS (modern typography, glassmorphism, responsive grid).
  - [ ] Create `CompanyService` for HTTP requests.
  - [ ] Create `CompanyListComponent` with Signals for state and search filtering.
  - [ ] Create `CompanyDetailComponent` with the AI Question box and loading indicators.
  - [ ] Implement bonus: Watchlist (localStorage).
  - [ ] Implement bonus: Basic CSS/SVG-based chart for sector distribution.

- [ ] **Step 4: Finalization & Documentation**
  - [ ] Test the full flow end-to-end.
  - [ ] Write a detailed `README.md` per the challenge instructions (how to run, tech choices, AI tools).
  - [ ] Verify everything works perfectly.
