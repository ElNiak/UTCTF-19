docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker build -t facesafe-solver solver/
docker build -t facesafe-web web/
