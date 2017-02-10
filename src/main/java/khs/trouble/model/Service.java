package khs.trouble.model;

import java.util.List;

import org.springframework.cloud.client.ServiceInstance;

public class Service {

	private String name;
	private List<ServiceInstance> instances;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ServiceInstance> getInstances() {
		return instances;
	}

	public void setInstances(List<ServiceInstance> instances) {
		this.instances = instances;
	}
}
