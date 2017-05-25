package khs.trouble.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import khs.trouble.model.Email;
import khs.trouble.repository.EmailRepository;

@Service
public class EmailService {
	
	@Autowired
	private EmailRepository emailRepository;
	
	public Iterable<Email> emails() {
		return this.emailRepository.findAll(new Sort(Sort.Direction.ASC, "created"));
	}
	
	public Email updateEmail(Email email){
		return this.emailRepository.save(email);
	}

}
