# khs-trouble-maker

Proactive Failure
-----------------
A successful Micro Service platform requires a durable and resilient environment that supports the ability to continously deploy multiple services. Automated deployment is a must, and when possible automated recovery from failures, and failures will happen, (i.e. "Murphy's Law")

Instead of waiting for a failure to occur and seeing how durable and resilent your plaftorm is. Be proactive and make failure a `use case` of your platform.  If you know failures are occurring and pagers are not going off at 3 a.m. or users are calling the help desk. Then you know your system if durable. 

Trouble Maker 
-------------
Netflix implemented `Chaos Monkey` to randomly take down services during normal business hours. Trouble Maker does the same thing, but also provides an adhoc console to produce common troublesome issues in your platform so you can test it's durability on demand. 


How Trouble Maker Works
-----------------------
Trouble Maker is a Java Spring Boot application that communicates with a a client service that has a small servlet registered with a Java API based service application. By default trouble maker accesses `Eureka` to discover services, and based upon a `chron` task, randomly select a a service to kill (i.e. shutdown). 

####Installing 




The Trouble Maker Dashboard has and event log and also allows services to be selected and killed on demand, and also invoke other trouble making issues against these services.  

![](/img/trouble-screen.png)


####Trouble Options
From the dashboard a service can be selected and the following trouble applied 

`KILL` - Terminate the service (i.e. system exit will be performed). Tests fail over and alert mechanisms.

`LOAD` - The selected service will be invoked with numerous blocking API's calls. Blocking time and number of threads can be specified. This emulates how service acts under API load.

`MEMORY` - The selected service will consume memory until HEAP memory is meet, then will block for specified time. This can be used to emulate how system performs under low memory conditions.

`EXCEPTION` - The selected service will throw an exception. This tests the exception handling logging, handling, and reporting mechanisms of the service.









































 


