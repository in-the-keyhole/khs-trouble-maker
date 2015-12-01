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

package khs.trouble.endpoint;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import khs.trouble.model.Event;
import khs.trouble.service.IServiceRegistry;
import khs.trouble.service.impl.EventService;
import khs.trouble.service.impl.TroubleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.khs.sherpa.annotation.Action;
import com.khs.sherpa.annotation.Endpoint;
import com.khs.sherpa.annotation.MethodRequest;
import com.khs.sherpa.annotation.Param;

@Endpoint(authenticated = false)
public class TroubleEndpoint {

	@Autowired
	TroubleService service;

	@Autowired
	EventService eventService;

	@Autowired
	IServiceRegistry serviceRegistry;
	
	@Value("${trouble.token}")
	String token;
	

	@Action(mapping = "/random/kill", method = MethodRequest.GET)
	public boolean randomKill(HttpServletRequest request) {
		service.randomKill(token);
		return true;

	}
	
	@Action(mapping = "/kill/{service}", method = MethodRequest.GET)
	public boolean kill(@Param("service") String serviceName,HttpServletRequest request) {
		service.kill(serviceName,token);
		return true;

	}
	
	
	@Action(mapping = "/random/load", method = MethodRequest.GET)
	public boolean randomBlock(HttpServletRequest request) {
		service.randomLoad(token);
		return true;

	}
	
	@Action(mapping = "/load/{service}", method = MethodRequest.GET)
	public boolean block(@Param("service") String serviceName,HttpServletRequest request) {
		service.load(serviceName,token);
		return true;

	}

	@Action(mapping = "/exception/{service}", method = MethodRequest.GET)
	public boolean exception(@Param("service") String serviceName,HttpServletRequest request) {
		service.exception(serviceName,token);
		return true;

	}
	
	@Action(mapping = "/random/exception/{service}", method = MethodRequest.GET)
	public boolean randomException(@Param("service") String serviceName,HttpServletRequest request) {
		service.exception(serviceName,token);
		return true;

	}
	
	
	@Action(mapping = "/memory/{service}", method = MethodRequest.GET)
	public boolean memory(@Param("service") String serviceName,HttpServletRequest request) {
		service.memory(serviceName,token);
		return true;

	}
	
	@Action(mapping = "/random/memory/{service}", method = MethodRequest.GET)
	public boolean randomMemory(@Param("service") String serviceName,HttpServletRequest request) {
		service.memory(serviceName,token);
		return true;

	}
	

	@Action(mapping = "/services", method = MethodRequest.GET)
	public List<String> services() {

		return serviceRegistry.serviceNames();

	}
	
	@Action(mapping = "/events", method = MethodRequest.GET)
	public Collection <Event> eventss() {

		return eventService.events();

	}
	
	@Action(mapping = "/valid", method = MethodRequest.GET)
	public boolean valid(@Param("token") String ltoken) {

		return token.equals(ltoken);

	}
	
	
	
	
	
	
	
	

}
