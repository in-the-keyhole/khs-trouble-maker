package khs.trouble.service;

import java.util.List;

public interface IServiceRegistry {
	public void start();
	public String lookup(String serviceName);	
	public List<String> serviceNames();
}
