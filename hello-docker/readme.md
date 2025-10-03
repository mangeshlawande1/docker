-t :: for tag , if not set it set to latest 
    docker build -t hello-docker .
    docker images 
// to ur app in shell mode 
    docker run -it hello-docker sh
    
    create rect app 

# set the base Image to create the image for app

// build image
docker build -t react-docker .

// run image 


// port mapping :: it allows to map port between the docker container and the host machine 

>> docker run -p 5173:5173 react-docker

// we have to expose that port for vite too

package.json 
script--> "dev" : "vite --host"

stop containers
>>> docker stop c3d

// for large no of containers reamove all stop container 

docker container prune

// forcefully kill running container
>>> docker rm aa7 --force

// Manipulate the existing container 
>>> docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules react-docker


Q. How to publish it in docker hub ::
// cd react-docker 
>>> docker login

>>> docker tag react-docker username/react-docker

/// run application 
docker compose :: it allows to define and manage multi-container docker application,
2. it uses the yaml file to configure the services, networks, volumes for your application enabled to  run and scale entire application within a single cmd 

docker init: docker cli which generate files for us ,
we initialize ur app with all neede file to dockerize it by specifying out tech choices.


/// cd react-project 
docker init  
it create dockerfile
dockerignore
compose.yaml

services:
  web:
    build:
      context: .
    ports:
      - 5173:5173
     volumes:
       - .:/app
       - /app/node_modules


>> sudo docker compose up
