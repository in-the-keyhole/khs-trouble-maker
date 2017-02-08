package khs.trouble.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import khs.trouble.model.Event;
import khs.trouble.model.EventContainer;

import khs.trouble.service.impl.EventService;

@Component
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
	private void sendEvent(WebSocketSession session, Event event) throws JsonProcessingException, IOException {
		session.sendMessage(new TextMessage(objectMapper.writeValueAsString(event)));
	}

	public void sendSingleEvent(Event event) throws JsonProcessingException, IOException  {
		// System.out.println("**** TRIGGER SEND SINGLE EVENT");
		// System.out.println("EVENT ACTION: " + event.getAction());
		
		for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
			WebSocketSession session = iterator.next();
			sendEvent(session, event);
		}
	}

	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

//	@Scheduled(fixedDelay = 30000)
	public void fetchCurrentEvents() throws JsonProcessingException, IOException {
		System.out.println("**** FETCH CURRENT EVENTS");
		
		this.eventContainer = new EventContainer();
		
		Iterable<Event> list = eventService.events();

		eventContainer.setEvents(list);

		for (Iterator<WebSocketSession> iterator = sessions.iterator(); iterator.hasNext();) {
			WebSocketSession session = iterator.next();
			sendEvents(session);
		}
	}
}