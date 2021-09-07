## Step 1: Create a Dockerfile

Open up a terminal on your local machine and change directory (cd) into Simple React Chat App directory:

```bash
cd <location-path>/simple-react-chat-app
```

Now that we have our Dockerfile, we will input the lines below to containerize our application. Each line will execute in order setting up our container image and allowing our ReactJS application to run in our environment. This will be a multi-stage build process and will be broken down into two phases; a build-step and run-step. 

```bash
#Build Steps
FROM node:alpine3.10 as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

#Run Steps
FROM nginx:1.19.8-alpine  
COPY --from=build-step /app/build /usr/share/nginx/html
```

To learn more about what is happening in the Dockerfile, check out my blog where I discuss in detail containerizing a ReactJS App: [Dockers and Dad Jokes: How to Containerize a ReactJS Application](https://ibm.biz/how-to-containerize-react-app-031821-bradstondev)

## Step 2: Create a .dockerignore

Next we will create a _.dockerignore_ file. This file will allow us to "ignore" specific files when building our docker image, which will help us save us build time and ensure we don't accidentally overwrite any installed files in our image.

```bash
node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod
```
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q3pwabyxv7p1h5mr1zae.png)

## Step 3: Build Docker Image

Our next step will be to build our Docker Image that we will want to run in our container. Here is the format of the command we will be using in our terminal for creating our Docker Image. 

```bash
docker build -t <image-name>:<tag> .
```
So what's happening here:
* _docker build_ initiates the Docker Image building process
* _-t_ Flag used for tagging build 'name:tag' format
* _image-name_ is our desired image name
* _tag_ is our desired tag for this version of the image. Used for deploying different versions of images
* _._ signifies the path that we will be building from. NOTE: This is **absolutely** necessary for the build command to work


So in our case this is what my build command will look like (feel free to use this command as well). 

```bash
docker build -t simple-chat-react-app:v1 .
```

## Step 4: Run Docker

Now let's run our Docker and see it in action.

The next command we will run in the terminal will look like this:

```bash
docker run -p 8080:80/tcp -d <image-name>:<tag>
```

So what's happening here:
* _docker run_ runs our Docker image within our container
* _-p_ is used to set the port we want to expose outside of our container to our host
* _8000:80/tcp exposes our application, hosted in our nginx server at port 80 in our container, on our local machine at the 8000 port
* _-d_ allows our container to run in the background, allowing us to continue to use our terminal.

In my case, the command will look like this:

```bash
docker run -p 8080:80/tcp -d simple-chat-react-app:v1
```

## Step 5: Verify Docker is Running and its Expose Port

 In order to verify, we will need to run this command in our terminal:

```bash
docker ps
```

Essentially, the _docker ps_ command lists all available running containers in our Docker environment. If we do not see our docker image listed in the list of available containers, then we did something incorrectly in a previous step and must fix that error. In my particular case, you should be able to see that the Docker port 80 is now being exposed at the port 8080 on my local machine (outside of the containerized environment).