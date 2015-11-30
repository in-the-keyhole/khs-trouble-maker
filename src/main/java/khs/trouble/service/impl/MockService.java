package khs.trouble.service.impl;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MockService {
	
	
	@Autowired
	private EventService eventService;

	
	@PostConstruct
	public void init() {
		
		eventService.started();
		
			
		
	}
	
	

}
