#Description:

This program is a simple chat with ReactJS ( frontend ) and Nodejs ( backend ) create by Mauritius Loic ( in a conflit between friend for a project ) using socketIO. </br>
The WebSocket is created with socketIO from NodeJS and works very well !! ;)</br>
For the frontend, I use a framework called ViteJS to build the application

#Install:

Pour installer toutes les dépendances
``` npm i ```
*Si elle n'y sont pas:
``` npm install socket.io socket.io-client express axios ```

#Run the program:

The server is on the port 5000, so make sure that it's free withthe command netstat -tan ( just in case )
To run the server on localhost, in a shell:
``` cd backend && node socketServer.js```

To run the frontend on localhost, in another shell and at the root of the application:
``` npm run dev ```
