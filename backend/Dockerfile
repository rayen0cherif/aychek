FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy the pom.xml
COPY pom.xml .

# Temporarily downscale java.version to 21 for the Docker build
# to ensure compatibility with stable Temurin images, without
# modifying the user's local Java 24 pom.xml setup.
RUN sed -i 's/<java.version>24<\/java.version>/<java.version>21<\/java.version>/g' pom.xml

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
