FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Speckles.Database/Speckles.Database.csproj", "Speckles.Database/"]
RUN dotnet restore "Speckles.Database/Speckles.Database.csproj"
COPY . .
WORKDIR "/src/Speckles.Database"
RUN dotnet publish "Speckles.Database.csproj" -c $BUILD_CONFIGURATION -o /app/publish/database /p:UseAppHost=false

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Speckles.Database.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Speckles.Database.dll"]
