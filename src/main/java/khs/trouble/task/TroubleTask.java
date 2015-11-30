package khs.trouble.task;

import java.util.logging.Logger;

import khs.trouble.service.impl.EventService;
import khs.trouble.service.impl.TroubleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TroubleTask {
	
	Logger LOG = Logger.getLogger(TroubleTask.class.getName());

	@Autowired
	TroubleService service;
	
	@Autowired
	EventService eventService;
	
	@Value("${auto.kill.enabled:true}")
	boolean autoKillEnabled;
	
	@Value("${trouble.token}")
	String token; 
	
	
    @Scheduled(cron = "${trouble.chron:0 0 14 * * MON-FRI}") //property in trouble.properties file...
	// every four hours
   // @Scheduled(fixedDelay = 1000 * 60 * 60 * 4)
    public void applyTrouble()
    {
       if (autoKillEnabled) {
    	String serviceName = service.randomKill(token);
       }	
     
       
    }
 

}
