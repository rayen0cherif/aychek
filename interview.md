# Nomow Internship

# — Technical

# Challenge

```
Full-Stack · Spring Boot 3 · Angular 18 · Light
AI integration
```
```
n 48 hours n Public GitHub repo n AI tools allowed
```
```
n
contact@aycheek.com
```
## Overview

Build a simple Company Screener web application. A user can browse a list of companies, view a company's
details, and ask a basic AI-powered question about it. The goal is not a polished product — it's a clean, working
prototype that demonstrates your ability to wire together a backend, a database, a frontend, and a simple AI call.

```
Stack
Backend: Spring Boot 3 · Java 17 · Spring Data JPA · PostgreSQL Frontend: Angular 18 · Standalone
Components · Signals AI: any free LLM API (Groq, OpenRouter, Google Gemini free tier — your choice)
Docker: optional but appreciated
```
## Part 1 — Backend (Spring Boot)

### Endpoints to implement

```
Method Endpoint What it does
GET /api/companies Return the full list of companies
GET /api/companies/{id} Return one company's details
POST /api/companies/{id}/ask Accept { question } → call AI API → return { answer }
```
### Data Model

- One table: Company — id, name, sector, country, description, foundedYear, employeeCount
- Seed at least 6 companies across different sectors and countries in a data.sql file

### AI Endpoint — POST /api/companies/{id}/ask

Fetch the company from the database, build a short prompt that includes the company data as context, call any
free LLM API, and return the response. Keep it simple.

Example prompt you could send to the LLM:
You are a helpful assistant. Here is information about a company: Name: Stripe | Sector:
FinTech | Country: USA | Founded: 2010 | Employees: 8000 Description: Online payment
infrastructure for the internet. User question: "What does this company do?" Answer
briefly in 2-3 sentences.


```
n Free LLM APIs that work well
Groq (groq.com) — very fast, free tier, supports Llama 3 Google Gemini — free tier via AI Studio
(aistudio.google.com) OpenRouter — free models available (openrouter.ai) Use any of these. Store your
API key in application.properties (do not commit it publicly).
```
## Part 2 — Frontend (Angular 18)

### One page is enough. It should include:

```
Company list Show all companies in a table or card grid. Include name, sector, country.
Search / filter Let the user filter by name or sector (client-side is fine).
Detail view Click a company → show its full details (panel, modal, or new route — your
choice).
AI question box Inside the detail view: a text input + button that calls POST /ask and displays the
answer.
```
### Angular guidelines

- Use Signals for at least one piece of state (search filter or AI response loading state)
- Use Standalone Components — no NgModules needed
- Show a loading indicator while the AI call is in progress
- Handle errors gracefully — don't let the app crash silently

## Bonus — Optional

Only attempt these if you finish the core requirements with time to spare:

- Docker Compose file to run backend + database together
- A simple chart (bar or pie) showing company distribution by sector
- A watchlist feature — let the user save companies locally

## What We Look For

```
Criterion What we look for
Does it run? We follow your README and the app works — backend, DB, and frontend.
API design Clean, consistent REST endpoints with proper HTTP status codes.
Code clarity Readable code, meaningful names, reasonable structure.
Angular quality Signals used correctly, components are focused, no unnecessary complexity.
AI integration The prompt makes sense, the response is displayed, loading/errors are handled.
Documentation README is honest — what works, what doesn't, what you'd improve.
```

## Submission

- Push your work to a public GitHub repository
- Commit regularly — we look at commit history
- Your README.md must include: how to run the project, your technical choices, incomplete parts, and AI
    tools used
- Send us the GitHub link by email before the deadline

```
nn Note
Partial submissions are welcome. A clear README explaining what works and what you ran out of time for
is far better than a broken app with no explanation.
```
```
Questions → contact@aycheek.com
```
```
Good luck — we're excited to see your
work n The Nomow Team
```

