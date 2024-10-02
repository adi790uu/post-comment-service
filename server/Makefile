.PHONY: run tidy lint build hello

run:
	go run main.go

tidy:
	go mod tidy

lint:
	golangci-lint run

hello:
	echo "Hello All"

build:
	go build -o main .
