FROM java:8
VOLUME /tmp
ADD target/khs-trouble-maker.jar app.jar
RUN bash -c 'touch /app.jar'
EXPOSE 9110
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-jar","/app.jar"]
