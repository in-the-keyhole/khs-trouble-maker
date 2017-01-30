package khs.trouble;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import khs.trouble.controller.ServicesHandler;

@EnableWebSocket
@Configuration
public class WebSocketConfiguration implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(servicesHandler(), "/ws/services").setAllowedOrigins("*");
	}

	@Bean
	public WebSocketHandler servicesHandler() {
		return new ServicesHandler();
	}
}