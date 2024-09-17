FROM alpine:3.17

ARG version=17.0.12.7.1

# Instalar Maven y dependencias necesarias
RUN apk update && \
    apk add --no-cache maven openjdk17-jdk wget bash

# Instalar Amazon Corretto JDK 17
RUN wget -O /THIRD-PARTY-LICENSES-20200824.tar.gz https://corretto.aws/downloads/resources/licenses/alpine/THIRD-PARTY-LICENSES-20200824.tar.gz && \
    echo "82f3e50e71b2aee21321b2b33de372feed5befad6ef2196ddec92311bc09becb  /THIRD-PARTY-LICENSES-20200824.tar.gz" | sha256sum -c - && \
    tar x -ovzf THIRD-PARTY-LICENSES-20200824.tar.gz && \
    rm -rf THIRD-PARTY-LICENSES-20200824.tar.gz && \
    wget -O /etc/apk/keys/amazoncorretto.rsa.pub https://apk.corretto.aws/amazoncorretto.rsa.pub && \
    SHA_SUM="6cfdf08be09f32ca298e2d5bd4a359ee2b275765c09b56d514624bf831eafb91" && \
    echo "${SHA_SUM}  /etc/apk/keys/amazoncorretto.rsa.pub" | sha256sum -c - && \
    echo "https://apk.corretto.aws" >> /etc/apk/repositories && \
    apk add --no-cache amazon-corretto-17=$version-r0 && \
    rm -rf /usr/lib/jvm/java-17-amazon-corretto/lib/src.zip

ENV LANG C.UTF-8
ENV JAVA_HOME=/usr/lib/jvm/java-17-amazon-corretto
ENV PATH=$PATH:/usr/lib/jvm/java-17-amazon-corretto/bin

# Copiar el pom.xml y descargar las dependencias
COPY pom.xml /app/
WORKDIR /app
RUN mvn dependency:go-offline

# Copiar el código fuente y construir el proyecto
COPY src /app/src
RUN mvn package -DskipTests

# Copiar el JAR de la aplicación desde la etapa de construcción
COPY /target/pedido-0.0.1-SNAPSHOT.jar /app/pedido.jar
# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/pedido.jar"]
