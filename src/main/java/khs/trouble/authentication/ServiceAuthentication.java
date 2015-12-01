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

package khs.trouble.authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import com.khs.sherpa.spring.SpringAuthentication;

/**
 * This class acts as the bridge between ldap (Spring) authentication and the
 * OAuthUser table.
 * 
 * @author DP
 * 
 *
 */
 
public class ServiceAuthentication extends SpringAuthentication {

	Log LOGGER = LogFactory.getLog(ServiceAuthentication.class);
	

	public String[] authenticate(String username, String password, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info("User User Authentication");
		
		return new String[]{ "admin" };

	}

	

}
