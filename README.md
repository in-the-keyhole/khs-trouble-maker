# Trouble Maker
Proactive Failure
-----------------
A successful Microservices platform requires a durable and resilient environment that supports the ability to continuously deploy multiple services. Automated deployment is a must, and when possible, automated recovery from failures should be implemented, because failures will happen, (i.e. "Murphy's Law").

Instead of waiting for a failure to occur and seeing how durable and resilient your platform is, be proactive and make failure a `USE CASE` of your platform. If you know failures are occurring and pagers are not going off at 3 a.m. and the help desk is not being called, then you know your system is durable. 

What is Trouble Maker 
---------------------
Netflix implemented `Chaos Monkey` to randomly take down services during normal business hours. Trouble Maker does the same thing, but also provides an adhoc console to produce common troublesome issues in your platform so you can test its durability on demand. 

####How Trouble Maker Works
Trouble Maker is a Java Spring Boot application that communicates with a a client service that has a small servlet registered with a Java API-based service application. By default, Trouble Maker accesses `Eureka` to discover services, and based upon a `chron` task, randomly selects a a service to kill (i.e. shut down).

By default when started, once a day Monday through Friday, a random service will be selected and killed. This option can be turned off, and when this occurs, can be configured. See configuration options section below. 
 

####Installing and Running

#####Dashboard WEB UI 

1. Git clone this repo.

2. Start the Java Spring Boot APP, or import into a JAVA IDE and start (JRE 1.8+ required). 

	java -jar jar/khs-trouble-maker.jar
  
3. Open browser with the following URL: 

	http://localhost:9110

#####Install Client API in a Java Service 

1. Add the following dependency in your Java Microservice pom.xml:

	<dependency>
	  <groupId>khs</groupId>
	  <artifactId>khs-trouble-maker-client</artifactId>
	  <version>1.0.0-SNAPSHOT</version>
	</dependency>

2. Define the following servlet in your `web.xml` or java `servlet` config:

	<servlet>
	    <servlet-name>trouble</servlet-name>
	    <servlet-class>khs.trouble.servlet</servlet-class>
	     <init-param>
            <param-name>token</param-name>
            <!-- token should match dashboard token -->
            <param-value>abc123</param-value>
        </init-param>
	</servlet>
	<servlet-mapping>
	    <servlet-name>trouble</servlet-name>
	    <url-pattern>/trouble/*</url-pattern>
	</servlet-mapping>
		
`NOTE:` Trouble Maker client servlet implementation can be found at [THIS](https://github.com/in-the-keyhole/khs-trouble-maker-client) repo.

####Dashboard
The Trouble Maker Dashboard has an event log and also allows services to be selected and killed on demand. It also invokes other troublemaking issues against these services. NOTE: The Dashboard defaults to and discovers services from a local instance of `Eureka`. 

![](/img/trouble-screen.png)


####Dashboard Trouple Options
From the dashboard a service can be selected and the following troubles applied: 

`KILL` - Terminate the service (i.e. system exit will be performed). Tests fail over and alert mechanisms.

`LOAD` - The selected service will be invoked with numerous blocking API calls. Blocking time and number of threads can be specified. This emulates how service acts under API load.

`MEMORY` - The selected service will consume memory until HEAP memory is met, then will block for a specified time. This can be used to emulate how system performs under low memory conditions.

`EXCEPTION` - The selected service will throw an exception. This tests the exception handling, logging, handling, and reporting mechanisms of the service.

####Configuration Options

These options are defined in the property file located at src/main/resources/META-INF/spring/trouble.properties

	###When to invoke Trouble Maker KILL service, default 2:00 pm Monday through Friday
	trouble.cron=0 0 14 * * MON-FRI
	
	### Access token that Trouble Maker client  
	trouble.token=abc123
	
	###Threads to spawn when Blocking trouble is invoked, default is 200
	###blocking.threads=200  
	
	###Trouble Service name, defaults to trouble.maker
	#trouble.service.name = trouble.maker
	
####Pluggable Service Registry

By default, trouble maker uses Netflix's Eureka service registry. However, any other service registry mechanism can be used.  Trouble Maker uses a service registry to discover services instances that it can apply trouble to.  

To use an alternative service registry simply implement the Interface contract shown below. 

	public interface IServiceRegistry {
		public void start();
		public String lookup(String serviceName);	
		public List<String> serviceNames();
	}

Then register it in the `src/main/resources/META-INF/spring/application-context-service-registry.xml` file as shown below. 

	<bean id="serviceregistry" class="khs.trouble.service.impl.MyServiceRegistry">
	</bean> 

####Token Based Access 

Requests made to a client trouble servlet supplies a token defined in the `trouble.properties` in the request header. This token needs to match the token supplied in the trouble client servlets init parameters. If they match then the operation will be performed. This type of access should be sufficient for internal behind the firewall access.

Here's a [LINK](https://github.com/in-the-keyhole/khs-trouble-maker-client) to the Trouble Client repository.  






