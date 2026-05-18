# Company Screener

A Company Screening prototype that enables users to browse a directory of companies, view detailed profiles, ask AI-powered questions, and save favorites to a personal watchlist.

## Features

*   **Company Directory:** View companies in a responsive grid layout.
*   **AI Integration:** Ask questions about specific companies using Groq API (LLaMA 3.1).
*   **Sector Chart:** A dynamic horizontal bar chart that displays the distribution of companies across different sectors.
*   **Watchlist:** Save companies to your local favorites list (`localStorage`) and easily filter them using the "Watchlist" toggle.
*   **Reactive State:** Search filtering and UI updates happen instantly using Angular 18 Signals.

## Tech Stack
*   **Backend:** Spring Boot 3, Java, Spring Data JPA, PostgreSQL.
*   **Frontend:** Angular 18, Tailwind CSS.
*   **AI Engine:** Groq API via Spring's `RestClient`.
*   **Infrastructure:** Docker & Docker Compose.

---

## How to Run

### Option A: Docker Compose (Recommended)
If you have Docker installed, you can spin up both the PostgreSQL database and the Spring Boot backend with a single command!

1. Open the root folder of the project.
2. Create a `.env` file in the root directory containing your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_key_here
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   ```
3. Run Docker Compose:
   ```bash
   docker-compose up --build
   ```
   *(The database will run on port `5432` and the backend on `http://localhost:8080`)*

### Option B: Local Setup
If you prefer not to use Docker:
1. Ensure PostgreSQL is running locally.
2. Create an empty database named `aychek`:
   ```sql
   CREATE DATABASE aychek;
   ```
3. Load sample data by running the data.sql file:
   ```bash
   psql -U postgres -d aychek -f backend/src/main/resources/data.sql
   ```
4. Open the `backend` folder and provide your database credentials and API key directly in `src/main/resources/application.yaml`.
5. Run the Spring Boot server using Maven:
   ```bash
   mvn spring-boot:run
   ```

### Starting the Frontend
1. Open the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
4. Open your browser and go to `http://localhost:4200`.

---

## Technical Decisions

*   **Feature-Based Architecture:** The Angular frontend is organized by feature (features/companies) instead of file type for better scalability and maintainability.
*   **State Management:** Used Angular Signals (signal, computed) instead of heavy RxJS logic for simpler reactive state handling.
*   **Styling:** Built with Tailwind CSS to create a clean UI.
*   **AI Hallucination Prevention:** The backend injects company data into the system prompt before calling the LLM to keep responses accurate and limited to real data.
