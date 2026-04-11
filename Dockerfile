# ─────────────────────────────────────────────
# Campus Resource Sharing System - Dockerfile
# Builds the Spring Boot backend
# Location: project root (not inside /backend)
# ─────────────────────────────────────────────

# Stage 1: Build the JAR using Maven Wrapper
FROM openjdk:17-jdk-slim AS builder

# Set working directory inside container
WORKDIR /app

# Copy the entire backend folder into the container
COPY backend/ .

# Make the Maven wrapper script executable
RUN chmod +x mvnw

# Build the project, skipping tests for speed
RUN ./mvnw clean package -DskipTests

# ─────────────────────────────────────────────
# Stage 2: Minimal runtime image
# ─────────────────────────────────────────────
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy only the built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Launch the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
