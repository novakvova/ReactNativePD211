#!/bin/bash

set -e

server_up() {
    echo "Server up..."
    docker pull novakvova/pd211-asp-api:latest
    docker stop pd211-asp_container || true
    docker rm pd211-asp_container || true
    docker run -d --restart=always -v /volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api
}

start_containers() {
    echo "Containers start..."
    docker run -d --restart=always -v /volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api
}

stop_containers() {
    echo "Containers stop..."
    docker stop pd211-asp_container || true
    docker rm pd211-asp_container || true
}

restart_containers() {
    echo "Containers restart..."
    docker stop pd211-asp_container || true
    docker rm pd211-asp_container || true
    docker run -d --restart=always -v /volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api
}

echo "Choose action:"
echo "1. Server up"
echo "2. Containers start"
echo "3. Containers stop"
echo "4. Containers restart"
read -p "Enter action number: " action

case $action in
    1)
        server_up
        ;;
    2)
        start_containers
        ;;
    3)
        stop_containers
        ;;
    4)
        restart_containers
        ;;
    *)
        echo "Invalid action number!"
        exit 1
        ;;
esac
