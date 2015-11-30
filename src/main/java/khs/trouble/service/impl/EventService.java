package khs.trouble.service.impl;

import java.util.Date;
import java.util.List;

import khs.trouble.base.BaseService;
import khs.trouble.model.Event;
import khs.trouble.repository.EventRepository;

import org.springframework.stereotype.Service;

@Service
public class EventService extends BaseService<EventRepository,Event> {

	
	public void killed(String serviceName,String url) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("KILLED");
		event.setDescription(serviceName.toUpperCase() + " killed at: "+url);
		this.repository.persist(event);
		
	}
	
	public void randomKilled(String serviceName) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("RANDOM");
		event.setDescription(serviceName.toUpperCase() + " selected to be killed");
		this.repository.persist(event);
		
	}
	
   public void load(String serviceName,String url,int threads) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("LOAD");
		event.setDescription(serviceName.toUpperCase() + " Load of ("+threads+" threads) started at: "+url);
		this.repository.persist(event);
		
	}
   
   public void exception(String serviceName,String url) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("EXCEPTION");
		event.setDescription(serviceName.toUpperCase() + " Exception thrown at: "+url);
		this.repository.persist(event);
		
	}
   
   public void memory(String serviceName,String url) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("MEMORY");
		event.setDescription(serviceName.toUpperCase() + " Memory Consumed at: "+url);
		this.repository.persist(event);
		
	}
   
   
   
   
  
	public void attempted(String msg) {
		
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("ATTEMPTED");
		event.setDescription(msg);
		this.repository.persist(event);
		
	}
	

	public void started()  {
		Event event = new Event();
		event.setCreated(new Date());
		event.setAction("STARTED");
		event.setDescription("Trouble maker started");
		this.repository.persist(event);
		
	}
	
	public List<Event> events()  {
		
		return this.repository.events();
		
	}

	
}
