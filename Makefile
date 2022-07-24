#!make

# Set environment variables for local development
-include ./config/.env

export $(shell sed 's/=.*//' ./config/.env)
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)

default:
	@echo "Please see README.md for usage of make commands"

run-local-development:
	@echo "+\n++ Starting local development server \n+"
	@docker-compose up --build