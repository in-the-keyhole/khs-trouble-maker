package khs.trouble.service.impl;

import java.util.ArrayList;
import java.util.List;

import khs.trouble.service.IServiceRegistry;
import khs.trouble.util.EurekaRegistry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.shared.Application;
import com.netflix.discovery.shared.Applications;

@Service
public class ServiceRegistry implements IServiceRegistry {


	@Autowired
	EurekaRegistry registry;
	
	@Value("${trouble.service.name:trouble.maker}")
	private String troubleMakerServiceName;
	
	@Override
	public void start() {
		registry.registerAndStart();
	}

	@Override
	public String lookup(String serviceName) {
		return registry.discoverAddress(serviceName, false);
	}
	
	
	public List<String> services() {
		
		List<String> results = new ArrayList<String>();
		Applications apps = registry.eurekaClient.getApplications();
		
		List<Application> list = apps.getRegisteredApplications();
		for (Application a : list) {
			List<InstanceInfo> instances = a.getInstances();
			for (InstanceInfo i : instances) {
				i.getVIPAddress();
				results.add(i.getVIPAddress());
				break;
			}

		}
		
		// Remove trouble maker service from list
		results.remove(troubleMakerServiceName);
		
		return results;
		
	}

	@Override
	public List<String> serviceNames() {
		return services();
	}
	
	

}
