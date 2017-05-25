package khs.trouble.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import khs.trouble.model.Email;

public interface EmailRepository extends PagingAndSortingRepository<Email, Long> {

}
