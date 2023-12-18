rundb:
	docker-compose up -d

down:
	docker-compose down

.PHONY: rundb down