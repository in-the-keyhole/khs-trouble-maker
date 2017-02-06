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

import khs.trouble.model.Event;
import khs.trouble.model.EventContainer;

import khs.trouble.service.impl.EventService;

public class EventsHandler extends TextWebSocketHandler {

	public List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();

	@Autowired
	//private DiscoveryClient discoveryClient;
	private EventService eventService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private EventContainer eventContainer;

	public EventsHandler() {
	}


	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		sendEvents(session);
	}

	private void sendEvents(WebSocketSession session) throws JsonProcessingException, IOException {
		session.sendMessage(new TextMessage(objectMapper.writeValueAsString(this.eventContainer)));
	}

	
//	public void sendSingleEvent(Event event) {
//		System.out.println("**** TRIGGER FETCH CURRENT EVENTS");
//		System.out.println(event);
//		
//		try {
//			for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
//				WebSocketSession session = iterator.next();
//				session.sendMessage(new TextMessage(objectMapper.writeValueAsString(event)));
//			}
//		} catch(Exception e) {
//			e.printStackTrace();
//		}
//		
//		//this.fetchCurrentEvents();
//
//		//	public void sendSingleEvent(Event event) throws JsonProcessingException, IOException {
////		
////		for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
////			WebSocketSession session = iterator.next();
////			//sendEvents(session);
////			session.sendMessage(new TextMessage(objectMapper.writeValueAsString(this.eventContainer)));
////
////		}
////
//	}

	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	@Scheduled(fixedDelay = 30000)
	private void fetchCurrentEvents() throws JsonProcessingException, IOException {
		this.eventContainer = new EventContainer();
		
		Iterable<Event> list = eventService.events();

		eventContainer.setEvents(list);

//		for (Iterator<String> iterator = list.iterator(); iterator.hasNext();) {
//			//String serviceId = (String) iterator.next();
//			Event application = new Event();
//			//application.setName(serviceId);
//			application.setInstances(discoveryClient.getInstances(serviceId));
//			events.add(application);
//		}
		
		for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
			WebSocketSession session = iterator.next();
			sendEvents(session);
		}
	}
}