package khs.trouble.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="schedule")
public class Schedule {
	
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	
	
	

}
