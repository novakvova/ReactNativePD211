@echo off

echo Docker login...
docker login

cd "WebCrotApi"

echo Building Docker image api...
docker build -t pd211-asp-api .

echo Tagging Docker image api...
docker tag pd211-asp-api:latest novakvova/pd211-asp-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/pd211-asp-api:latest

echo Done ---api---!
pause

