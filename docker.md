1. hypervisor : virtual machine a software responsible for managing resources 

    physical server, cpu devices --> hypervisor   --> can make multiple isolated machines 
        inside virtual machine  having guest os , some bins/libraries , apps(web server, llm )
    it should install entire operating system
    it's time consuming task , 
    


2. Engine --> docker 
    much more faster 

        physical server, cpu devices --> operating system --> docker Engine(, )  --> can make multiple isolated machines 

      docker engine-->  dont need to install whole os, it will give you the bare minimum requirements of all underlaying os
      it create separate isolation machine 

      1. easy to use 
        1.1 consistency 
        1.2 scalable 
        1.3 isolation 
        1.4 portable
        1.5 efficiency 

    docker bring just docker engine for  u 
    docker hub : a place from where it bring all code which are required to run this app/container.
    local hub : docker first check there is in local hub if not it bring from docker hub , get in local-hub then fetch from localhub 


    cmds 
    docker pull  :: it bring the binaries/images keep in system 
    docker run  :: runs 2 cmds docker pull + docker run , as well 
    docker ps :: list all containers in the docker 
    docker run busybox
    docker ps -a :: get all container with their ids 
    docker stop  <container_id> :: stop the running container 
    docker remove  <container_id> :: remove the  container 
    docker images :: get all images ,first remove the container related to imgs then remove image 
    docker rmi <img_id> 

some of software keeps terminal busy, we want to run them in background that is known as detached mode in docker
Q. how do we go with that ?

    docker  run -d busybox 


#### execute certain cmd within the container 
docker ps -a

docker exec -it <continer_id> /bin/bash


## Concepts Containers , images dockerfiles
dockerfiles have a declarative code 

this app should not expose like this
user make request , it not goes to react directly  
react serve some server ie  webproxy known as nginx .

react + nginx = dockerize together

user interact with nginx  (normal workflow )
