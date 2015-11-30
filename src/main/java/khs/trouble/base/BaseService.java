package khs.trouble.base;

import java.util.Collection;

import khs.trouble.boot.JPABaseRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class BaseService<TRepo extends JPABaseRepository<T, Long>, T> {

	@Autowired
	protected TRepo repository;

	public T merge(T entity) {

		return repository.merge(entity);
	}

	public T persist(T entity) {
		return repository.persist(entity);
	}

	public void remove(T entity) {

		repository.remove(entity);
	}

	public boolean delete(Class<T> clazz, Long id) {

		T entity = find(clazz, id);
		if (entity == null) {
			return false;
		}
		repository.remove(entity);

		return true;

	}

	public Collection<T> findAll(Class<T> clazz, String... eagerPaths) {

		return repository.findAll(clazz, eagerPaths);

	}

	public T find(Class<T> clazz, Long id) {
		return repository.find(clazz, id);
	}

}
