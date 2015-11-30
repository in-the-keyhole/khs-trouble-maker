package khs.trouble.repository;

import khs.trouble.boot.JPABaseRepository;
import khs.trouble.model.Target;

import org.springframework.stereotype.Component;

@Component
public class TroubleRepository extends JPABaseRepository<Target,Long> {

}
