package khs.trouble;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

//import org.springframework.beans.factory.annotation.Autowired;

import khs.trouble.controller.ServicesHandler;
import khs.trouble.controller.EventsHandler;

@EnableWebSocket
@Configuration
public class WebSocketConfiguration implements WebSocketConfigurer {
	
//	@Autowired
//	EventsHandler eventsHandler;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(servicesHandler(), "/ws/services").setAllowedOrigins("*");
		registry.addHandler(eventsHandler(), "/ws/events").setAllowedOrigins("*");
	}

	@Bean
	public WebSocketHandler servicesHandler() {
		return new ServicesHandler();
	}

	@Bean
	public WebSocketHandler eventsHandler() {
		return new EventsHandler();
	}
}