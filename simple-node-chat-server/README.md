## Step 1: Launch Red Hat OpenShift Cluster

If you are attending the workshop live, you will be given a link that will navigate you to your Red Hat OpenShift Resource in IBM Cloud. 

NOTE: If you are not attending live, you can get access to a Red Hat OpenShift by using the IBM Open Labs [Red Hat OpenShift on IBM Cloud](http://ibm.biz/open-labs-red-ha-openshift-bradstondev) and using the resource provisioned to you there.

Once on the IBM Cloud resource page, click the "OpenShift web console" button in the top right corner of the screen. 

![13 - Launch Web console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5kumjtzme5th5yrxbhqo.png) 

You should soon be navigated to the landing page/dashboard of your Red Hat OpenShift Resource. It should look something like this:

![14 - OpenShift Dasboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kro51u8bbmy48s1ouqv8.png) 

## Step 2: Create OpenShift Project

On the dashboard page, click the "Administrator" drop-down button in the top left and select "Developer".

![15 - Select Developer View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3sg00i2o9zaoygyh2b0d.png) 

You should now see the Developer Perspective of Red Hat OpenShift web console.

![16 - Dev Perspective Tour](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/16dh0qpb4803w46kxkbu.png) 

Now select the  drop-down that likely says "Project: all projects" near the top left and select the "Create Project" option:

![17 - Select Create Project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9jtvno4i9ubwytcsp0ka.png) 

Once selected, we will be presented with a "Create Project" pop-up. Enter any name that you desire. I will be inputting "simple-chat-app". All other fields are optional. Note: Name must be all lower-case. 

Once all fields are filled as you desire, select "Create"

![18 - Create Project Pop-up](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2df9ukhlx5qh0tol6g0l.png)
 
Once our project is created, we will select the "From Dockerfile" Option on Topology page:

![19 - Select From Dockerfile](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ut6wajobdjt8c4g5tg6j.png)

Once selected, we will enter https://github.com/bradstondevcode/simple-chat-app as our "Git Repo URL"

We will then select "Show Advance Git options" and in the "Context dir" input box we will input "simple-node-chat-server".

![20 - Input Git URL and Context dir](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zxbx1yrckzbuvhofzwp0.png)

Next, The "Dockerfile path" input should stay the default value of "Dockerfile". 

Below that enter your desired "Application name" and "Name". I will be using "simple-chat-app" and "simple-chat-server", respectively. Below those fields, ensure "Deployment" is selected and the "Create a Route to the Application" option is checked under the "Advanced Options" section. Once all those details are entered, select Create.

 ![21 - Create Server app options](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oxsrrbl95qy7h7ephi6j.png)

We should now see our application in out Topology view. Over the next few minutes we will see the status of application go from "building" to "ready" We will know our application is ready when there is a green check mark next to app.

![27 - Pod status change](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sun8vwi160e2wu5x52hk.png)
 
Once "Ready", select the "Open in New Window" Icon to open Server.

![28 - Open in Server in New Window](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q9ok9z2ityrep6a03tgo.png)

You should see the words "CANNOT GET /" in your browser window. 

![29 - Server Working Message](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7o89pymx6sitg251s3pj.png)
 
 
Copy the web address in your browser. This will be used in the [ ReactJS frontend portion](https://github.com/bradstondevcode/simple-chat-app/tree/master/simple-react-chat-app) of the application for connecting to the chatroom.