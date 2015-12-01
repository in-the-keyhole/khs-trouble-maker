package khs.trouble.base;

import java.util.Collection;

import khs.trouble.boot.JPABaseRepository;

import org.springframework.beans.factory.annotation.Autowired;

/*
 * Copyright 2015 Keyhole Software LLC.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

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
