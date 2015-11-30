package khs.trouble.repository;

import java.util.List;

import javax.persistence.Query;

import khs.trouble.boot.JPABaseRepository;
import khs.trouble.model.Event;

import org.springframework.stereotype.Component;

@Component
public class EventRepository extends JPABaseRepository<Event, Long> {

	public List<Event> events() {
		Query q = entityManager
				.createQuery("select e from Event e order by e.created desc");
		return q.getResultList(); 
		

	}

}
