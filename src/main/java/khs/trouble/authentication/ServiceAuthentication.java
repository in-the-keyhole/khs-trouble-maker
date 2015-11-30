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
