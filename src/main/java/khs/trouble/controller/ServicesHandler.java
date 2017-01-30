package khs.trouble.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import khs.trouble.model.Service;
import khs.trouble.model.ServiceContainer;

public class ServicesHandler extends TextWebSocketHandler {

	public List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();

	@Autowired
	private DiscoveryClient discoveryClient;

	@Autowired
	private ObjectMapper objectMapper;
	
	private ServiceContainer serviceContainer;

	public ServicesHandler() {
	}

	// @Override
	// public void handleTextMessage(WebSocketSession session, TextMessage
	// message) throws IOException {
	// session.sendMessage(new TextMessage("echo: " + message.getPayload()));
	// }

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		sendServices(session);
	}

	private void sendServices(WebSocketSession session) throws JsonProcessingException, IOException {
		session.sendMessage(new TextMessage(objectMapper.writeValueAsString(this.serviceContainer)));
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	@Scheduled(fixedDelay = 30000)
	private void fetchCurrentServices() throws JsonProcessingException, IOException {
		this.serviceContainer = new ServiceContainer();
		List<Service> services = new ArrayList<Service>();
		serviceContainer.setServices(services);

		List<String> list = discoveryClient.getServices();
		for (Iterator<String> iterator = list.iterator(); iterator.hasNext();) {
			String serviceId = (String) iterator.next();
			Service application = new Service();
			application.setName(serviceId);
			application.setInstances(discoveryClient.getInstances(serviceId));
			services.add(application);
		}
		for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
			WebSocketSession session = iterator.next();
			sendServices(session);
		}
	}
}