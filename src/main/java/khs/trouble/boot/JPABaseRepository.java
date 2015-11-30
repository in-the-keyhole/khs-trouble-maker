package khs.trouble.boot;

import java.util.List;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

// TODO: Figure out why transactions don't work with Hystrix
public class JPABaseRepository<T, ID> {

	@javax.persistence.Transient
	@javax.persistence.PersistenceContext(name = "dataFactory", unitName = "data")
	protected javax.persistence.EntityManager entityManager;

	protected String groupKey;

	public JPABaseRepository() {
		this.groupKey = this.getClass().getSimpleName();
	}
	
	public JPABaseRepository(String hystrixGroupKey) {
		this.groupKey = hystrixGroupKey;
	}

	@Transactional(readOnly = true)
	public Long count(Class<T> clazz) {
		// DaoCountCommand<T> command = new DaoCountCommand<T>(hystrixGroupKey,
		// entityManager, clazz);
		// return command.execute();

		return (Long) entityManager.createQuery("select count(o) from " + clazz.getName() + " o").getSingleResult();
	}

	@Transactional(readOnly = true)
	public T find(Class<T> clazz, ID id, String... eagerPaths) {
		// DaoFindByIdCommand<T, ID> command = new DaoFindByIdCommand<T,
		// ID>(hystrixGroupKey, entityManager, clazz, id);
		// return command.execute();

		return entityManager.find(clazz, id);
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<T> find(String query) throws RuntimeException {
		// DaoFindByQueryCommand<T> command = new
		// DaoFindByQueryCommand<T>(hystrixGroupKey, entityManager, query);
		// return command.execute();

		Query queryObject = entityManager.createQuery(query);
		return queryObject.getResultList();

	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<T> findAll(Class<T> clazz, String... eagerPaths) {
		// DaoFindAllCommand<T> command = new
		// DaoFindAllCommand<T>(hystrixGroupKey, entityManager, clazz,
		// eagerPaths);
		// return command.execute();

		String queryString = "from " + clazz.getName();
		Query queryObject = entityManager.createQuery(queryString);
		return queryObject.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<T> findEntries(Class<T> clazz, int firstResult, int maxResults) {
		// DaoFindEntriesCommand<T> command = new
		// DaoFindEntriesCommand<T>(hystrixGroupKey, entityManager, clazz,
		// firstResult, maxResults);
		// return command.execute();

		return entityManager.createQuery("select o from " + clazz.getName() + " o").setFirstResult(firstResult)
				.setMaxResults(maxResults).getResultList();
	}

	@Transactional
	public T merge(T entity) {
		// DaoMergeCommand<T> command = new DaoMergeCommand<T>(hystrixGroupKey,
		// entityManager, entity);
		// return command.execute();

		T merged = entityManager.merge(entity);
		entityManager.flush();
		return merged;

	}

	@Transactional
	public T persist(T entity) {
		// DaoPersistCommand<T> command = new
		// DaoPersistCommand<T>(hystrixGroupKey, entityManager, entity);
		// return command.execute();

		entityManager.persist(entity);
		return entity;
	}

	@Transactional
	public void remove(T entity) {
		// DaoRemoveCommand<T> command = new
		// DaoRemoveCommand<T>(hystrixGroupKey, entityManager, entity);
		// boolean success = command.execute();

		entity = entityManager.merge(entity);
		entityManager.remove(entity);
	}
}
