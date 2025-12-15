#Build

FROM maven:3.9.9-amazoncorretto-21-al2023 AS build

WORKDIR /build

COPY . .

RUN mvn clean package -DskipTests

#Run

FROM amazoncorretto:21.0.2

WORKDIR /app

COPY --from=build ./build/target/*.jar ./app.jar

EXPOSE 8080

ENV DATASOURCE_URI=''
ENV TZ='America/Sao_Paulo'

ENTRYPOINT ["java", "-jar", "app.jar"]