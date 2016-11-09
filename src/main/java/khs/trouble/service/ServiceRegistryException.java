package khs.trouble.service;

public class ServiceRegistryException extends RuntimeException {

	private static final long serialVersionUID = 6777389971204093068L;

	public ServiceRegistryException(String message, Throwable cause) {
		super(message, cause);
	}
}
