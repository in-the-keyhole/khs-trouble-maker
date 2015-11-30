package khs.trouble.authentication;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;


public class ServiceAuthenticationManager implements AuthenticationManager {



	//private Authenticator authenticator;
	
	
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		
		String serviceid = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		String[] rolesArray = null;
		if (rolesArray != null) {
			
			SecurityContextImpl context = new SecurityContextImpl();
			
			 authentication = new Authentication() {
			    String id = serviceid;
			    String pw = password;
				public String getName() {
					return id;
				}
				
				public void setAuthenticated(boolean isAuthenticated)
						throws IllegalArgumentException {
					
				}
				
				public boolean isAuthenticated() {							
					return true;
				}
				
				public Object getPrincipal() {
					return null;
				}
				
				public Object getDetails() {
					return null;
				}
				
				public Object getCredentials() {
					return pw;
				}
				
				public Collection<? extends GrantedAuthority> getAuthorities() {
					return null;
				}
			};
			context.setAuthentication(authentication);
			SecurityContextHolder.setContext(context);
			
		}	
			
	
		return authentication;
	}



	
}
