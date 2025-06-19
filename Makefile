serve:
	python3 -m http.server 8000 --directory docs

deploy:
	@echo "Push /docs to GitHub to deploy via Pages"

lint:
	npx prettier --check "docs/**/*.{js,css,html,json}"

format:
	npx prettier --write "docs/**/*.{js,css,html,json}"
