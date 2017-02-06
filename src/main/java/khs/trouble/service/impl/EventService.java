/*
 * Copyright 2015 Keyhole Software LLC.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package khs.trouble.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import khs.trouble.model.Event;
import khs.trouble.repository.EventRepository;
//import khs.trouble.controller.EventsHandler;

@Service
public class EventService {

	@Autowired
	private EventRepository repository;

//	@Autowired
//	private EventsHandler eventsHandler;

	
	@Value("${trouble.timeout:300000}")
	private Long timeout;

	public void killed(String serviceName, String url) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("KILLED");
		event.setDescription(serviceName.toUpperCase() + " killed at: " + url);
		this.repository.save(event);
		
//		System.out.println("**** EVENT SERVICE KILLED");
//		try {
//			//EventsHandler eventsHandler = new EventsHandler();
//			eventsHandler.sendSingleEvent(event);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

	public void randomKilled(String serviceName) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("RANDOM");
		event.setDescription(serviceName.toUpperCase() + " selected to be killed");
		this.repository.save(event);
	}

	public void load(String serviceName, String url, int threads) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("LOAD");
		event.setDescription(serviceName.toUpperCase() + " Load of (" + threads + " threads) started at: " + url + " will timeout in " + timeout());
		this.repository.save(event);
	}

	public void exception(String serviceName, String url) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("EXCEPTION");
		event.setDescription(serviceName.toUpperCase() + " Exception thrown at: " + url);
		this.repository.save(event);
	}

	public void memory(String serviceName, String url) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("MEMORY");
		event.setDescription(serviceName.toUpperCase() + " Memory Consumed at: " + url + " will timeout in " + timeout());
		this.repository.save(event);
	}

	public void eventInfo(String msg) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("INFO");
		event.setDescription(msg);
		this.repository.save(event);
	}

	public void attempted(String msg) {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("ATTEMPTED");
		event.setDescription(msg);
		this.repository.save(event);
	}

	public void started() {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("STARTED");
		event.setDescription("Trouble maker started");
		this.repository.save(event);
	}

	public void notStarted() {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("NOT STARTED");
		event.setDescription("Service Registry Not Found, Make sure it has been started or is accessible");
		this.repository.save(event);
	}

	public String timeout() {
		String msg = timeout == 0 ? "NEVER" : "" + (timeout / 60000) + " minute(s)";
		return msg;
	}

	public Iterable<Event> events() {
		return this.repository.findAll(new Sort(Sort.Direction.ASC, "created"));
	}
}
