# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["alina-backend.csproj", "./"]
RUN dotnet restore "alina-backend.csproj"

# Copy the rest of the code
COPY . .

# Build and publish
RUN dotnet publish "alina-backend.csproj" -c Development -o /app/publish /p:UseAppHost=false

# Final stage: runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS final
WORKDIR /app
EXPOSE 5602

# Copy published output
COPY --from=build /app/publish .

# Copy keys and .env as requested by the user for development
COPY keys/ ./keys/
COPY .env .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5602

ENTRYPOINT ["dotnet", "alina-backend.dll"]
