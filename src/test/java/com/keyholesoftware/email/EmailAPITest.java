package com.keyholesoftware.email;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.nio.charset.Charset;
import java.util.Arrays;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import org.springframework.web.context.WebApplicationContext;

import khs.trouble.Application;
import khs.trouble.model.Email;
import khs.trouble.repository.EmailRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration()
public class EmailAPITest {
	
	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

	private MockMvc mockMvc;
	private String fullName ="Keyhole Employee";
	private String emailAddress = "keyholeEmployee@keyhole.com";
	
	@SuppressWarnings("rawtypes")
	private HttpMessageConverter mappingJackson2HttpMessageConverter;
	
	@Autowired
	private EmailRepository emailRepository;
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	@Autowired
	void setConverters(HttpMessageConverter<?>[] converters) {

		this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream().filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().get();

		Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}
	
	@Before
	public void setup() throws Exception{
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
		
		Email email = new Email();
		email.setFullName(fullName);
		email.setEmailAddress(emailAddress);
		email = emailRepository.save(email);
	}
	
	@Test
	public void readEmails() throws Exception {
		mockMvc.perform(get("/api/emails")).andExpect(status().isOk()).andExpect(content().contentType(contentType));
	}
	
	@Test
	public void updateEmails() throws Exception{
		mockMvc.perform(post("/api/emails") 
                .param("fullname", "Joe Blow") 
                .param("emailaddress", "joeB@email.com")                 
                .contentType(MediaType.APPLICATION_FORM_URLENCODED) 
                .accept(MediaType.APPLICATION_JSON)) 
        .andExpect(status().isOk()); 
		
	}

}
