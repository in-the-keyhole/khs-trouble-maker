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

package khs.trouble.boot;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import khs.trouble.service.IServiceRegistry;
import khs.trouble.service.impl.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.boot.context.embedded.jetty.JettyEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@EnableScheduling
@EnableAsync
@EnableWebSecurity
@SpringBootApplication
@ImportResource("classpath*:META-INF/spring/application-context*.xml")
public class Application implements ServletContextInitializer {

	public static void main(final String[] args) {
		System.out.println(Application.class.getName() + "#main");
		SpringApplication.run(Application.class, args);
	}

	@Autowired
	private Environment environment;

	@Autowired
	private IServiceRegistry registry;

	@Autowired
	private EventService eventService;

	@Bean
	public EmbeddedServletContainerFactory getEmbeddedServletContainerFactory() {
		System.out.println(Application.class.getName()
				+ "#getEmbeddedServletContainerFactory");
		// e.g. command line arg: java -jar <WAR_NAME> --port=9110
		final int port = environment.getProperty("port", int.class, 9110);
		JettyEmbeddedServletContainerFactory factory = new JettyEmbeddedServletContainerFactory(
				port);
		// factory.setSessionTimeout(10, TimeUnit.SECONDS);
		return factory;
	}

	public void onStartup(final ServletContext servletContext)
			throws ServletException {
		System.out.println(Application.class.getName() + "#onStartup");

		ServletRegistration servletRegistration = servletContext.addServlet(
				"dispatcher",
				org.springframework.web.servlet.DispatcherServlet.class);
		servletRegistration
				.setInitParameter(
						"contextClass",
						org.springframework.web.context.support.AnnotationConfigWebApplicationContext.class
								.getName());
		servletRegistration.addMapping("/api/*");

		if (registry.start()) {

			eventService.started();
		}

		else {

			eventService.notStarted();
		}

	}

	public void setEnvironment(Environment environment) {
		this.environment = environment;
	}

}