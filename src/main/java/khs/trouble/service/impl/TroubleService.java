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
import java.util.logging.Logger;

import khs.trouble.base.BaseService;
import khs.trouble.model.Target;
import khs.trouble.repository.TroubleRepository;
import khs.trouble.service.IServiceRegistry;
import khs.trouble.util.FormatUrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TroubleService extends BaseService<TroubleRepository, Target> {

	private Logger LOG = Logger.getLogger(TroubleService.class.getName());

	@Autowired
	IServiceRegistry registry;

	@Autowired
	EventService eventService;

	@Value("${trouble.token}")
	String token;

	@Value("${trouble.timeout:300000}")
	Long timeout;

	@Value("${blocking.threads:200}")
	Integer threads;
	
	@Value("${trouble.ssl:false}")
	Boolean ssl;
	
	public String randomKill(String ltoken) {
       
		String serviceName = randomService();
		eventService.randomKilled(serviceName);
		return kill(serviceName, ltoken);

	}

	public String kill(String serviceName, String ltoken) {

		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		String url = FormatUrl.url(registry.lookup(serviceName) + "/trouble/kill",ssl);

		// invoke kill api...

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",
				headers);

		try {
			ResponseEntity<String> result = restTemplate.exchange(url,
					HttpMethod.GET, entity, String.class);

			eventService.killed(serviceName, url);

		} catch (Exception e) {

			eventService.attempted("Attempted to Kill service " + serviceName
					+ " at " + url + " Failed due to exception "
					+ e.getMessage());
		}

		return serviceName;

	}

	public String randomLoad(String ltoken) {

		return load(randomService(), ltoken);

	}

	public String load(String serviceName, String ltoken) {

		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		for (int i = 0; i < threads; i++) {
			LOG.info("Starting Thread " + i);
			spawnLoadThread(serviceName, 1000);
		}

		String url = FormatUrl.url(registry.lookup(serviceName) + "trouble/load",ssl);

		eventService.load(serviceName, url,threads);

		return serviceName;

	}

	public String randomService() {

		Random rn = new Random();

		List<String> list = registry.serviceNames();

		int range = list.size();
		int randomNum = rn.nextInt(range);

		return list.get(randomNum);

	}
	
	public String randomException(String ltoken) {

		return exception(randomService(), ltoken);

	}
		
	public String exception(String serviceName,String ltoken) {
		
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		String url = FormatUrl.url(registry.lookup(serviceName) + "/trouble/exception",ssl);

		// invoke kill api...

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",
				headers);

		try {
			ResponseEntity<String> result = restTemplate.exchange(url,
					HttpMethod.GET, entity, String.class);

			eventService.exception(serviceName, url);

		} catch (Exception e) {

			eventService.attempted("Attempted to throw exception at service " + serviceName
					+ " at " + url + " Failed due to exception "
					+ e.getMessage());
		}


		return serviceName;
	
	}
	
    
	public String randomMemory(String ltoken) {

		return memory(randomService(), ltoken);

	}
	
	
	public String memory(String serviceName,String ltoken) {
		
		if (token != ltoken) {
			throw new RuntimeException("Invalid Access Token");
		}

		String url = FormatUrl.url(registry.lookup(serviceName) + "/trouble/memory",ssl);

		// invoke memory api...

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
		headers.add("token", token);
		headers.add("timeout", "" + timeout);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",
				headers);

		try {
			ResponseEntity<String> result = restTemplate.exchange(url,
					HttpMethod.GET, entity, String.class);

			eventService.memory(serviceName, url);

		} catch (Exception e) {

			eventService.attempted("Attempted to consume memory at service " + serviceName
					+ " at " + url + " Failed due to exception "
					+ e.getMessage());
		}


		return serviceName;
	
	}
	
	
	
	
	
	

	public void spawnLoadThread(String serviceName, final long sleep) {

		Runnable run = new Runnable() {

			public void run() {
				try {

					String url = FormatUrl.url(registry.lookup(serviceName)
							+ "/trouble/load",ssl);

					// invoke kill api...

					RestTemplate restTemplate = new RestTemplate();

					HttpHeaders headers = new HttpHeaders();
					headers.setAccept(Arrays.asList(MediaType.TEXT_PLAIN));
					headers.add("token", token);
					headers.add("timeout", "" + timeout);
					HttpEntity<String> entity = new HttpEntity<String>(
							"parameters", headers);

					try {

						ResponseEntity<String> result = restTemplate.exchange(
								url, HttpMethod.GET, entity, String.class);

					} catch (Exception e) {

						eventService.attempted("Attempted to Load service "
								+ serviceName + " at " + url
								+ " Failed due to exception " + e.getMessage());
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
