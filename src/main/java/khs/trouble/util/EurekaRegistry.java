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

package khs.trouble.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Date;
import java.util.logging.Logger;
import org.springframework.stereotype.Component;
import com.netflix.appinfo.ApplicationInfoManager;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.appinfo.MyDataCenterInstanceConfig;
import com.netflix.config.DynamicPropertyFactory;
import com.netflix.discovery.DefaultEurekaClientConfig;
import com.netflix.discovery.DiscoveryManager;
import com.netflix.discovery.EurekaClient;

@Component
public class EurekaRegistry {

	private static Logger LOG = Logger.getLogger(EurekaRegistry.class.getName());
	
	public static  ApplicationInfoManager applicationInfoManager;
	public static  EurekaClient eurekaClient;
	public static DynamicPropertyFactory configInstance;
	
	public void registerAndStart() {
		this.register();
		this.start();
	}
	
	public void register() {
		
		configInstance = DynamicPropertyFactory
				.getInstance();
		applicationInfoManager = ApplicationInfoManager
				.getInstance();

		DiscoveryManager.getInstance().initComponent(
				new MyDataCenterInstanceConfig(),
				new DefaultEurekaClientConfig());

		eurekaClient = DiscoveryManager.getInstance()
				.getEurekaClient();

	}

	public void start() {

		// A good practice is to register as STARTING and only change status to
		// UP
		// after the service is ready to receive traffic
		LOG.info("Registering service to eureka with STARTING status");
		applicationInfoManager
				.setInstanceStatus(InstanceInfo.InstanceStatus.STARTING);

		LOG.info("Simulating service initialization by sleeping for 2 seconds...");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// Nothing
		}

		// Now we change our status to UP
		LOG.info("Changing status to UP");
		applicationInfoManager
				.setInstanceStatus(InstanceInfo.InstanceStatus.UP);
		waitForRegistrationWithEureka(eurekaClient);
		LOG.info("Service started and ready to process requests..");
		
	 
	    
	}
	
	
	 public void stop() {
	        if (eurekaClient != null) {
	            eurekaClient.shutdown();
	        }
	    }



	    private void waitForRegistrationWithEureka(EurekaClient eurekaClient) {
	        // my vip address to listen on
	        String vipAddress = configInstance.getStringProperty("eureka.vipAddress", "sampleservice.mydomain.net").get();
	        InstanceInfo nextServerInfo = null;
	        while (nextServerInfo == null) {
	            try {
	                nextServerInfo = eurekaClient.getNextServerFromEureka(vipAddress, false);
	            } catch (Throwable e) {
	                LOG.info("Waiting ... verifying service "+vipAddress+" is registered with eureka ...");

	                try {
	                    Thread.sleep(10000);
	                } catch (InterruptedException e1) {
	                    e1.printStackTrace();
	                }
	            }
	        }
	        
	        
	        
	        
	        
	    }
	
	    private void processRequest(final Socket s) {
	        try {
	            BufferedReader rd = new BufferedReader(new InputStreamReader(s.getInputStream()));
	            String line = rd.readLine();
	            if (line != null) {
	                System.out.println("Received a request from the example client: " + line);
	            }
	            String response = "BAR " + new Date();
	            System.out.println("Sending the response to the client: " + response);

	            PrintStream out = new PrintStream(s.getOutputStream());
	            out.println(response);

	        } catch (Throwable e) {
	            System.err.println("Error processing requests");
	        } finally {
	            if (s != null) {
	                try {
	                    s.close();
	                } catch (IOException e) {
	                    e.printStackTrace();
	                }
	            }
	        }
	    }
	    
	    
	public String discoverAddress(String vipAddress,boolean validate) {

		if (applicationInfoManager == null || eurekaClient == null || configInstance == null) {
			throw new RuntimeException("Eureka Registry not Started");
		}
		
		String address = null;
        InstanceInfo nextServerInfo = null;
       try {
            nextServerInfo = this.eurekaClient.
                    getNextServerFromEureka(vipAddress, false);
        } catch (Exception e) {
            LOG.severe("Cannot get instance "+vipAddress+" to talk to from eureka");
            throw new RuntimeException("Error trying to discover "+vipAddress + e);
           
        } 
        LOG.info("Found an instance of "+vipAddress+"  service to talk to from eureka: "
                + nextServerInfo.getHostName() + ":" + nextServerInfo.getPort());

        address = nextServerInfo.getHostName()+":"+nextServerInfo.getPort()+"/";
        
        if (validate) {
        
        Socket s = new Socket();
        int serverPort = nextServerInfo.getPort();
        try {
            s.connect(new InetSocketAddress(nextServerInfo.getHostName(), serverPort));
        } catch (IOException e) {
            System.err.println("Could not connect to the server :"
                    + nextServerInfo.getHostName() + " at port " + serverPort);
        } catch (Exception e) {
            System.err.println("Could not connect to the server :"
                    + nextServerInfo.getHostName() + " at port " + serverPort + "due to Exception " + e);
        }
        try {
            String request = "FOO " + new Date();
            System.out.println("Connected to server. Sending a sample request: " + request);

            PrintStream out = new PrintStream(s.getOutputStream());
            out.println(request);

            System.out.println("Waiting for server response..");
            BufferedReader rd = new BufferedReader(new InputStreamReader(s.getInputStream()));
            String str = rd.readLine();
            if (str != null) {
                System.out.println("Received response from server: " + str);
                System.out.println("Exiting the client. Demo over..");
            }
            rd.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        }  
        // finally shutdown
	
	  return address;
	
	
	}	
		    
	 
}



