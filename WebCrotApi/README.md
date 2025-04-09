# pd211-asp

Create docker hub repository - publish
```
docker build -t pd211-asp-api . 
docker run -it --rm -p 4872:8080 --name pd211-asp_container pd211-asp-api
docker run -d --restart=always --name pd211-asp_container -p 4872:8080 pd211-asp-api
docker run -d --restart=always -v d:/volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 pd211-asp-api
docker run -d --restart=always -v /volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 pd211-asp-api
docker ps -a
docker stop pd211-asp_container
docker rm pd211-asp_container

docker images --all
docker rmi pd211-asp-api

docker login
docker tag pd211-asp-api:latest novakvova/pd211-asp-api:latest
docker push novakvova/pd211-asp-api:latest

docker pull novakvova/pd211-asp-api:latest
docker ps -a
docker run -d --restart=always --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api

docker run -d --restart=always -v /volumes/pd211-asp/images:/app/uploading --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api


docker pull novakvova/pd211-asp-api:latest
docker images --all
docker ps -a
docker stop pd211-asp_container
docker rm pd211-asp_container
docker run -d --restart=always --name pd211-asp_container -p 4872:8080 novakvova/pd211-asp-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   pd211api.itstep.click *.pd211api.itstep.click;
    client_max_body_size 200M;
    location / {
       proxy_pass         http://localhost:4872;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
}


sudo systemctl restart nginx
certbot
```
