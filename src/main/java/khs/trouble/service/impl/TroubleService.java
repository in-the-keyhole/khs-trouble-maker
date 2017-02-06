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

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Iterator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.cloud.netflix.eureka.EurekaDiscoveryClient;

import khs.trouble.util.FormatUrl;

@Service
public class TroubleService {

	private Logger LOG = LoggerFactory.getLogger(TroubleService.class.getName());

	@Autowired
	DiscoveryClient discoveryClient;

	@Autowired
	EventService eventService;

	@Value("${trouble.token}")
	String token;

	@Value("${trouble.timeout:300000}")
	Long timeout;

	@Value("${trouble.blocking-threads:200}")
	Integer threads;

	@Value("${trouble.ssl:false}")
	Boolean ssl;

	@Value("${eureka.client.registry-fetch-interval-seconds}")
	private Long monitorInterval;

	public String randomKill(String ltoken) {
		String serviceName = randomService();
		eventService.randomKilled(serviceName);
		//return kill(serviceName, ltoken);
		return kill(serviceName, "", ltoken);
	}

	public String kill(String serviceName, String instanceId, String ltoken) {
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		//String url = FormatUrl.url(randomInstanceURL(serviceName) + "trouble/kill", ssl);
		String url = FormatUrl.url(serviceInstanceURL(serviceName, instanceId) + "trouble/kill", ssl);
		
		// invoke kill api...
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

		try {
			// int instanceCount = registry.instanceCount(serviceName);
			ResponseEntity<String> result = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			if (result.getStatusCode() == HttpStatus.OK) {
				eventService.killed(serviceName, url);
				// monitorServiceRecovery(serviceName, instanceCount);
			}
		} catch (Exception e) {
			eventService.attempted("Attempted to Kill service " + serviceName + " at " + url + " Failed due to exception " + e.getMessage());
		}
		return serviceName;
	}

	// private void monitorServiceRecovery(String serviceName, int
	// originalCount) {
	// ScheduledExecutorService exec =
	// Executors.newSingleThreadScheduledExecutor();
	//
	// Runnable run = () -> {
	// LOG.debug("Checking status of " + serviceName);
	// int currentCount = registry.instanceCount(serviceName);
	// LOG.debug(serviceName + " instance count: " + currentCount);
	// if (currentCount == originalCount) {
	// LOG.info(serviceName + ": has recovered.");
	// LOG.debug("TroubleMaker recover monitor stopped.");
	// exec.shutdown();
	// }
	// };
	// exec.scheduleAtFixedRate(run, monitorInterval, monitorInterval,
	// TimeUnit.SECONDS);
	// }

	public String randomLoad(String ltoken) {
		//return load(randomService(), ltoken);
		return load(randomService(), "", ltoken);
	}

	public String load(String serviceName, String instanceId, String ltoken) {
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		for (int i = 0; i < threads; i++) {
			LOG.info("Starting Thread " + i);
			spawnLoadThread(serviceName, instanceId, 1000);
		}

		//String url = FormatUrl.url(randomInstanceURL(serviceName) + "trouble/load", ssl);
		String url = FormatUrl.url(serviceInstanceURL(serviceName, instanceId) + "trouble/load", ssl);

		eventService.load(serviceName, url, threads);

		return serviceName;
	}

	public String randomService() {
		List<String> list = discoveryClient.getServices();
		Random rn = new Random();
		int range = list.size();
		int randomNum = rn.nextInt(range);
		return list.get(randomNum);
	}

	public String serviceInstanceURL(String serviceName, String instanceId) {
		List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);

		String returnVal = "";

		// IF AN "INSTANCEID" VALUE WAS PASSED IN, THEN FIND THAT PARTICULAR ONE
		// ELSE JUST PICK A RANDOM INSTANCE
		if(!instanceId.equals("")) { 
			// LOOP THROUGH SERVICEINSTANCES OF SERVICE, ATTEMPING TO MATCH ON INSTANCEID
			for (Iterator<ServiceInstance> iterator = instances.iterator(); iterator.hasNext();) {
				EurekaDiscoveryClient.EurekaServiceInstance serviceInstance = (EurekaDiscoveryClient.EurekaServiceInstance) iterator.next();

				String tmpInstanceId = serviceInstance.getInstanceInfo().getInstanceId();
				//System.out.println(tmpInstanceId);
				
				if(tmpInstanceId.equals(instanceId)) {
					returnVal = serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/";
					break;
				}
			}
		} else {
			Random rn = new Random();
			int range = instances.size();
			int randomNum = rn.nextInt(range);
			ServiceInstance rndm = instances.get(randomNum);
			returnVal = rndm.getHost() + ":" + rndm.getPort() + "/";
		}

		return returnVal;
	}

	public String randomInstanceURL(String serviceName) {
		List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
		Random rn = new Random();
		int range = instances.size();
		int randomNum = rn.nextInt(range);
		ServiceInstance serviceInstance = instances.get(randomNum);
		return serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/";
	}

	public String randomException(String ltoken) {
		return exception(randomService(), "", ltoken);
	}

	public String exception(String serviceName, String instanceId, String ltoken) {
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		//String url = FormatUrl.url(randomInstanceURL(serviceName) + "/trouble/exception", ssl);
		String url = FormatUrl.url(serviceInstanceURL(serviceName, instanceId) + "/trouble/exception", ssl);

		// invoke kill api...

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

		try {
			restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			eventService.exception(serviceName, url);
		} catch (Exception e) {
			eventService.attempted("Attempted to throw exception at service " + serviceName + " at " + url + " Failed due to exception " + e.getMessage());
		}
		return serviceName;
	}

	public String randomMemory(String ltoken) {
		return memory(randomService(), "", ltoken);
	}

	public String memory(String serviceName, String instanceId, String ltoken) {
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		//String url = FormatUrl.url(randomInstanceURL(serviceName) + "/trouble/memory", ssl);
		String url = FormatUrl.url(serviceInstanceURL(serviceName, instanceId) + "/trouble/memory", ssl);

		// invoke memory api...

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		headers.add("timeout", "" + timeout);
		HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

		try {
			restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			eventService.memory(serviceName, url);
		} catch (Exception e) {
			eventService.attempted("Attempted to consume memory at service " + serviceName + " at " + url + " Failed due to exception " + e.getMessage());
		}
		return serviceName;
	}

	public void spawnLoadThread(final String serviceName, String instanceId, final long sleep) {

		Runnable run = new Runnable() {

			public void run() {
				try {

					//String url = FormatUrl.url(randomInstanceURL(serviceName) + "/trouble/load", ssl);
					String url = FormatUrl.url(serviceInstanceURL(serviceName, instanceId) + "/trouble/load", ssl);

					// invoke kill api...

					RestTemplate restTemplate = new RestTemplate();

					HttpHeaders headers = new HttpHeaders();
					headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
					headers.add("token", token);
					headers.add("timeout", "" + timeout);
					HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

					try {
						restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
					} catch (Exception e) {
						eventService.attempted("Attempted to Load service " + serviceName + " at " + url + " Failed due to exception " + e.getMessage());
					}
					Thread.sleep(sleep);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		};

		Thread thread = new Thread(run);
		thread.start();
	}
}