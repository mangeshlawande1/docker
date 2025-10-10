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
## Kubernates 
if there are too many request for single container to handle , that container has sealing, and it dies ur app dies with it , hence kubernates comes into picture,
**kubernates** is a container orchestration platform 
feature:
    1. schedule 
    2. scale 
    3. self heal 
    4. load balance the container across machines ,so your app says up

a single process can handle limited number of concurrent requests before cpu and memory becomes bottlenecks ,
we can tune and scale vertically , there is always going to be ceiling and single point of failure, hence need replicas and 
automated way to place it & manage them that is kubernates.
also known as k8s, it is open source platform ,
it helps to run your app across multiple nodes , 
scale replicas ups and down based on demands , 
restarts unhealthy containers automatically 
& distribute traffic across replicas 
all rolling out updates without downtime
docker gives u  containers 
kebernates decides how, where & when they run 
ie kubernates is operating system for your container without this u need to manage container manually 
    starting /stopping containers,
    keeping track of IP addresses,
    restarting crashed apps,
    scaling things up or down by hand 

Kubernates components :
   1. Cluster :
        a group of machine which virtual , physical that work together as single system .
        -cluster is made up of control plane , which decides schedules, reconciles & monitor health.

  2. worker node : a machine where ur container runs 
    each worker node runs a cubullets , an agent that communicate with the control plane and container runtime ie docker .
    cube-proxy : handles networking and routing inside cluster for every node .

3. PODS :: 
    kebernates dont run container directly,Instead a container are wrapped in something caled pod .
    a pod is the smallest deployable unit in kubernates , there is usually 1 container per pod  & each pod get its own IP address,
    when u deploy ur app , kubernates runs it inside a pods 
    you never interact containeer directly in kubernates ,
    u can run multiple pods by specify something known as replica set  
5. replica set  :: ensures a specified ie 4 number of pods are always running.
    if 1 die it automatically spin a new one


6. Deployment :
 it is highr level object that manages replica set ,
 it allows u to define update to your application.
kebernates can rolling updates, gradually replace all pods with new ones, it never see down time ,ensures reality always matches desired state .
1. pods are temporary,they come & go each   time they get a new ip, 
2. the user connect pods throug services : 
it's a stable endpoints , can have permanent ip or dns name that automatically route traffic to available pods behind it. 
it also load balances request along multiple replicas

**configMaps and secrets** : app needs configurations and credentials 
1.1. configMaps : store configuration data 
1.2. secrets : store sensitive data 

**Ingress** :
   like a smart router that expose https and http routes to the outside world   
   ie.,  it can map api.myapp.com to your backend service 

**Volumes**: 
  kubernates provide volumes for storage 

**create local cluster before production cluster**:
they simulate a whole kubenates env without risking ur production app. 

eg., 1.1 kind : kunernates in docker which  runs cluster inside container , efficient for cicd pipeline & automated testing 
1.2 K3S : lightweight kubernates distribution ,
goods internet of things ,
resource-constrained machines

**1.3 Minicube**: it is lightweight and run a single node(cluster have single node act both contrl plane and worker node  )cluster inside a virtual machine or container    
cluster is usually multinode.

**control plane nodes :** manages the cluster like
  API server, schedule, kubelet   
**worker node** : run app workload containing pods and container 

for single node both both role on the same machine.

kubernates-demo :

npm init 
npm i express 
cli for kubernates 
cubectl 
install minikube local kubernates , focusing on making it easy to learn & develope for kubernates 
touch index.js


push image to docker hub 

after dockerization ,
make image  horizontally scalable 

make dir k8s 
deployment.yaml
 define api version
 specification : how many replicas want 


 
---

## 🚀 6️⃣ Cluster vs Container vs Pod — Summary

| Term | Scope | Contains | Example |
|------|--------|-----------|----------|
| **Cluster** | Entire K8s environment | Multiple nodes | Minikube cluster |
| **Node** | One machine (worker) | Multiple pods | minikube node |
| **Pod** | Smallest deployable unit | One or more containers | A pod running Express app |
| **Container** | Application runtime | App code + libs | Docker container inside pod |

📦 Example:
- Cluster has 1 node (Minikube)
- Node runs 3 pods (frontend, backend, db)
- Each pod runs 1 container (Docker image)

---

## ⚙️ 7️⃣ Typical Workflow (Local Dev → K8s)

1. **Build image** → `docker build -t my-app .`  
2. **(Optional)** Load into Minikube → `minikube image load my-app`  
3. **Deploy to K8s** → `kubectl apply -f deployment.yaml`  
4. **Expose it** → `kubectl apply -f service.yaml`  
5. **Access app** → `minikube service my-app-service`

---

## 💡 8️⃣ Quick Comparison Table

| Feature | Docker | Kubernetes |
|----------|---------|-------------|
| Purpose | Run individual containers | Orchestrate multiple containers |
| Networking | Port mapping | Cluster-wide internal networking |
| Scaling | Manual | Automatic via replicas |
| Fault Tolerance | Restart container only | Reschedule pod on another node |
| Storage | Local volumes | Persistent Volumes |
| CLI | `docker` | `kubectl` |
| Local Tool | Docker Desktop | Minikube / kind |

---
eval $(minikube docker-env)
``` |
| **Example commands** |
- Start cluster: `minikube start`  
- View services: `minikube service <service-name>`  
- Stop/delete: `minikube stop`, `minikube delete` |

---

## 🔧 4️⃣ kubectl — Kubernetes CLI (Command-Line Interface)

| Concept | Description |
|----------|--------------|
| **kubectl** | The **official CLI tool** to interact with your Kubernetes cluster. |
| **Purpose** | Used to create, inspect, delete, and debug Kubernetes resources. |
| **Example Commands** |  
- `kubectl get pods` → List all pods  
- `kubectl apply -f deployment.yaml` → Deploy your app  
- `kubectl logs <pod>` → View logs  
- `kubectl exec -it <pod> -- /bin/bash` → Open shell inside container |

🧠 Think of:
> `kubectl` = remote control  
> `Kubernetes` = TV system  
> `YAML` = TV programs to show  

---

## 🧠 5️⃣ Kubernetes Objects Hierarchy (Simple Visual)

# kubernates-demo % docker tag kubernates-demo-api:latest jsmasterpro/kubernates-demo-api:latest

kubernates-demo-api:latest - The source image

kubernates-demo-api - Your local image name

:latest - The tag (version) of the image

jsmasterpro/kubernates-demo-api:latest - The target image

jsmasterpro - Your Docker Hub username (or organization name)

kubernates-demo-api - Repository name on Docker Hub

:latest - Tag for the remote image

What This Command Does:
Creates an alias - It doesn't copy the image data, just creates a new reference to the same image layers

Prepares for push - Formats the image name according to Docker Hub naming conventions

Maintains version - Keeps the latest tag


.. push the image to docker hub 

>> docker push jsmasterpro/kubernates-demo-api:latest


--- Make docker image horizontally scalable,
### use Kubernates ::

k8s folder
  deployment.yaml
    -> define the api version 
    -> metadata: name 
    specification : 
       -> create copies of app/replicas 
       -> add some labels 

    spec: define specification for containers> give image , name amd app, port , pass additional env variables 
    -> attatch different amt of resources 

    -> mention docker image u want to use 
    -> mention port to listen on  
    -> 

provide network access to our pods
-> create service.yaml
      -> define version
      kind:service 
      metadata: 
      mention port , protocol 

tool that sets up local cluster on a laptop
cmds 
    >> minikube start
    >> kubectl get nodes
    >> kubectl apply -f k8s/ : both files run simultaneously 

    >>kubectl get pods -w :: get status 
    >>minikube service service_name: run services

    >>
    >>


:::: 
Api server receives a yaml file ,
 schedular assign pods to nodes 
kubukates start container inside pods 
service ensures the network is running in these pods 

:::
1. have to create docker image 
2. push it over to docker hub 
3. start minikube 
4. do kubernates deployment 
5. get list of pods 
6. get services
7. test it out. these type of action repeates again and again 

Instead of this , write a bash script 
deploy.sh

set -e :: want to run in bash
NAME=
USERNAME=
IMAGE = "$USENAME/$NAME:latest"

echo "building docker image" for console log

docker build -t $IMAGE .

echo "pushing image to Docker Hub..." for console log

docker push $IMAGE

echo "Apply Kubernates manifest..."
 kubectl apply -f k8s/deployment.yaml
 kubectl apply -f k8s/service.yaml

echo "getting pods..."
kubectl get pods

echo "getting services..."
kubectl get services

echo "fetching the main service..."
kubectl het services $NAME-service

minikube stop 
delete all container 
minikube start

set configuration in package.json
"deploy":"sh deploy.sh"

npm run deploy

minikube service service_name


for scaling , in deployment yaml, change the number of replicas
hence u can rescale the app within seconds 

