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

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;

import khs.trouble.service.IServiceRegistry;

@Component
public class EurekaServiceRegistry implements IServiceRegistry {

	@Autowired
	DiscoveryClient discoveryClient;

	@Override
	public boolean start() {
		return this.discoveryClient != null;
	}

	@Override
	public String lookup(String serviceName) {
		String address = null;
		List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
		for (ServiceInstance serviceInstance : instances) {
			address = serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/";
			break;
		}
		return address;
	}

	public List<String> serviceNames() {
		return discoveryClient.getServices();
	}

	@Override
	public int instanceCount(String serviceName) {
		return discoveryClient.getInstances(serviceName).size();
	}
}