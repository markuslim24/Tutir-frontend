### Tutir

Link to frontend repository: [https://github.com/markuslim24/Tutir-frontend](https://github.com/markuslim24/Tutir-frontend)<br/>
Link to backend repository: [https://github.com/Manoharan-Ajay-Anand/tutir-backend](https://github.com/Manoharan-Ajay-Anand/tutir-backend)

Tutir is a platform that enables students to watch tutorial videos and find notes relevant to their curriculum made by their very own schoolmates.

### Basic App Architecture

Our application uses Nest.js(a Node.js framework) for our backend. The backend uses MongoDB as our database. Our frontend uses Next.js(a React framework). We have two repositories, one for our frontend and one for our backend. The application is hosted in Google Cloud Platform's(GCP) Cloud Run service.

### Continous Integration/Continous Deployment(CI/CD)

We also use the GCP's Cloud Build service to build our apps. Cloud Build service helps to automatically update and deploy changes to our application as soon as a push to the main brach of the repositories has been detected. Using two seperate repositories enables us to customize build commands specific to the repository and also deploy changes to our frontend or backend independently of each other. For example, if we have a minor change to our frontend(for example, correcting a spelling mistake), we only have to push the changes to the main branch of the frontend repository. This will automatically trigger the build and deployment process only for the frontend, leaving our backend untouched, accelerating our build and deployment process. Each repository has a cloudbuild.yaml file. The file instructs the Cloud Build service on how to build and deploy our application. We can also give commands to test our application which enables us to do automated testing before the application is deployed.

### Authentication

Internally, our application uses JWT tokens for authenticating our users. JWT tokens are digitally signed by our backend based on a secret key. The tokens can be verified by our server, using the secret key, for secure requests(accessing/changing the users personal information or payment). JWT tokens enable our application to be highly scalable as there is no need to have a central storage that stores our session tokens. When the user logins, we provide two JWT tokens, one session token and one refresh token. The session token is a short-lived token(expires in two hours) that is the primary token that is verified for all secure requests. For every secure request, the client is expected to provide the token in the Authorization request header as part of the Bearer authentication scheme. We do not use cookies for our session tokens as cookies are automatically submitted by the browser for requests and malicious websites can use a CSRF attack to successfully trigger secure requests to our backend without the knowledge of the client, causing massive damage. Our refresh token is stored in a browser cookie with the HttpOnly flag set. This causes the refresh token to be inaccessible to the frontend script. If our website was vulnerable to an XSS attack, only the session token will be exposed and since the session token is short-lived, only limited damage can be caused. The client uses the refresh token to obtain a new session token upon expiry which makes it convenient for our users as they do not have to login again.       
