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
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


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

//		final FilterRegistration urlRewritefilterRegistration = servletContext
//				.addFilter(UrlRewriteFilter.class.getSimpleName(),
//						UrlRewriteFilter.class);
//		urlRewritefilterRegistration.addMappingForUrlPatterns(
//				EnumSet.of(DispatcherType.REQUEST), true, "*");
//		final FilterRegistration crossOriginFilterRegistration = servletContext
//				.addFilter("SimpleCORSFilter", new Filter() { // https://spring.io/guides/gs/rest-service-cors/
//							@Override
//							public void doFilter(final ServletRequest req,
//									final ServletResponse res,
//									final FilterChain chain)
//									throws IOException, ServletException {
//								final HttpServletResponse response = (HttpServletResponse) res;
//
//								HttpServletRequest request = (HttpServletRequest) req;
//								String clientOrigin = request
//										.getHeader("origin");
//								if (clientOrigin != null) {
//									response.setHeader(
//											"Access-Control-Allow-Origin",
//											clientOrigin);
//								} else {
//									response.setHeader(
//											"Access-Control-Allow-Origin", "*");
//								}
//								response.setHeader(
//										"Access-Control-Allow-Credentials",
//										"true");
//								response.setHeader(
//										"Access-Control-Allow-Methods",
//										"POST, GET, OPTIONS, DELETE");
//								response.setHeader(
//										"Access-Control-Allow-Credentials",
//										"true");
//								response.setHeader("Access-Control-Max-Age",
//										"3600");
//								response.setHeader(
//										"Access-Control-Allow-Headers",
//										"x-requested-with, content-type, userid, token");
//								chain.doFilter(req, res);
//							}
//
//							@Override
//							public void init(final FilterConfig filterConfig) {
//							}
//
//							@Override
//							public void destroy() {
//							}
//						});
//
//       servletContext.getServletRegistration("default").addMapping("/*");
//
//		crossOriginFilterRegistration.addMappingForUrlPatterns(
//				EnumSet.of(DispatcherType.REQUEST), true, "/api/*");
//
//	    servletContext.getServletRegistration("default").addMapping("/app/*");
//		servletContext.setInitParameter("sherpaConfigLocation",
//				"classpath:sherpa.properties");
//		servletContext.addListener(SherpaContextListener.class.getName());
//		ServletRegistration servletRegistration = servletContext.addServlet(
//				"sherpa", SherpaServlet.class);
//		servletRegistration.addMapping("/api");
//		servletRegistration.addMapping("/api/*");
		
		  System.out.println("Initialize servlets...");
		    ServletRegistration servletRegistration = servletContext.addServlet("dispatcher", org.springframework.web.servlet.DispatcherServlet.class);
		    servletRegistration.setInitParameter("contextClass",  org.springframework.web.context.support.AnnotationConfigWebApplicationContext.class.getName());
		    servletRegistration.addMapping("/api/*");
		  
		
		

		

		if (registry.start()) {

			eventService.started();
		}

		else {

			eventService.notStarted();
		}

	}
	
	
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		
//		if (!registry.hasMappingForPattern("/**")) {
//			registry.addResourceHandler("/**").addResourceLocations(
//					CLASSPATH_RESOURCE_LOCATIONS);
//		}
//	}
	
	

	public void setEnvironment(Environment environment) {
		this.environment = environment;
	}
	
//	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
//		"classpath:/META-INF/resources/", "classpath:/resources/",
//		"classpath:/static/", "classpath:/public/" };
	
	
	
	

}