# Makefile specification
# ----------------------

GithubID = TimCoding
RepoName = HomeSweHome
# NEED TO UPDATE THIS BEFORE WE SUBMIT (last updated 4/19 at 5:21pm)
SHA      = b7f009e173bc33e981da6659c1266f930a68247e

# Do not confuse with directories
.PHONY: frontend backend setup-backend setup-frontend build-frontend

run: build-frontend setup-backend
	@(python3 run.py)

# need to run with sudo
run-prod: build-frontend setup-backend
	@(./runprod.sh)

setup-backend:
	@(python3 setup.py install)

setup-frontend:
	@(cd react_app; npm install)

build-frontend: setup-frontend
	@(cd react_app; npm run build)

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# The Makefile should be present in the root of the project.
# There should be the following commands written:

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://github.com/${GithubID}/${RepoName}/projects/7"

# make uml      - prints link to uml diagram
uml:
	@echo "https://epicdavi.gitbooks.io/report/uml.html"

# make selenium - runs selenium tests
selenium: build-frontend
	python3 frontend/guitests.py

# make frontend - runs frontend tests
frontend: build-frontend
	@(cd react_app; npm run test)

# make backend  - runs backend tests
backend:
	python3 -m unittest server_tests

# make postman - runs postman tests
postman:
	newman run Postman.json

# make website  - prints link to a website
website:
	@echo "http://homeswehome.me/"

# make report   - prints link to technical report
report:
	@echo "http://epicdavi.gitbooks.io/report/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "http://epicdavi.gitbooks.io/api/"

# make self     - prints link to self critique
self:
	@echo "http://epicdavi.gitbooks.io/report/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "http://epicdavi.gitbooks.io/report/other-critique.html"
