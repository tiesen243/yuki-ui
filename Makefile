pkm = bun

help:
	@echo "Available commands:"
	@echo "  make install         Install dependencies"
	@echo "  make build-packages  Build all packages"
	@echo "  make build           Build the application"
	@echo "  make dev             Start the development server"
	@echo "  make lint            Lint the code"
	@echo "  make format          Format the code"


install:
	@echo "Installing dependencies..."
	@$(pkm) install

build-app:
	@echo "Building application..."
	@$(pkm) --filter @yuki/kaze build

build-packages:
	@echo "Building packages..."
	@$(pkm) --filter './packages/*' build

build:
	@echo "Building application and packages..."
	@$(pkm) --filter '*' build

dev:
	@echo "Starting development server..."
	@$(pkm) --filter @yuki/kaze dev

lint:
	@echo "Linting code..."
	@./node_modules/.bin/oxlint --fix

format:
	@echo "Formatting code..."
	@./node_modules/.bin/oxfmt --write

