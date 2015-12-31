FROM maven:3.3.3-jdk-8
RUN mkdir --parents /usr/src/app
WORKDIR /usr/src/app
ADD /pom.xml /usr/src/app/
RUN mvn verify clean --fail-never
ADD . /usr/src/app
RUN echo cache-6
RUN mvn clean package --update-snapshots -Dmaven.test.skip=true
EXPOSE 8080
ENTRYPOINT ["java","-jar","target/app.jar"]
