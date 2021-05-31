![Image of Tutir](https://frontend-vfwidhkcjq-as.a.run.app/_next/image?url=%2Flogo.svg&w=96&q=75)

Link to application: [https://frontend-vfwidhkcjq-as.a.run.app](https://frontend-vfwidhkcjq-as.a.run.app)<br/>
Link to frontend repository: [https://github.com/markuslim24/Tutir-frontend](https://github.com/markuslim24/Tutir-frontend)<br/>
Link to backend repository: [https://github.com/Manoharan-Ajay-Anand/tutir-backend](https://github.com/Manoharan-Ajay-Anand/tutir-backend)

# Motivation

As students, we often look online for tutorial videos to better understand what is being taught in university. It can be quite cumbersome to find the most relevant videos as many tutorial videos online are either taught differently from our university or beyond the scope of the syllabus. Students are generally at various proficiency levels and more advanced students will easily be able to teach weaker students. That is where Tutir comes in.

Tutir is a video sharing platform that enables students to view tutorial videos or notes created by their very own peers. Viewers can pay tips to the content creators to encourage them to continue creating more quality content.

# Aim 

We hope to create a convenient video-sharing platform where university students can easily view, create and share educational videos relating to various university courses.


# User stories

1. Students will be able to look through tutorial videos on skills or topics they are interested to learn. They can also rate the videos.

2. Students will be able to see top-rated videos and will have videos recommended to them based on their interests.

3. Students will be able to search for videos based on the relevance to their university and their course.
4. Students who are proficient in certain skills and wish to share it with others can upload tutorial videos. They can tag their videos with categories so that other users can easily locate them.

5. Students who have made tutorial videos can receive tips from viewers so that they have the monetary incentive to create videos.

# Features

### Homepage

The Homepage will be the main interface for students to search for videos on our platform.

### Content Creation

Students can register on our platform and upload their own video and notes to share with other users.

### User profile

The User Profile will be where users can view their statistics both as an uploader and viewer. They will be able to make changes to profile details such as their name, email or password.

### Tagging system

A Tagging System for the videos will make it easier for students to search for a specific video based on certain criterias(e.g. topic, course, relevance to module etc).

### Comments panel

The Comments Panel will appear with every video. The user can comment on the videos as a feedback for the creators.

### Favorites and History tab

The Favourites and History tab will be where users can see their favourite and previously watched videos respectively.

### Recommendation System

The Recommendation System will be able to recommend videos to users based on past videos and their interests they have watched.

### Tips system

The Tips System will allow users to send small amounts of cash to content creators to thank them for their contribution.

# Development Plan

Currently Implemented:

1. Login and Registration system

Features to be completed by June:

1. Homepage
2. Content Creation System
3. Tagging system
4. Comments panel
5. Favourites and History tab

Features to be completed by July:

1. Recommendation system
2. Tips system

# Application Architecture

Our application is seperated into two endpoints, a backend and frontend. Both endpoints are in seperate GitHub repositories. Our application is hosted on Google Cloud Platform's (GCP) Cloud Run service.

## Backend

The backend wil be the API endpoint for our application. Our application uses Nest.js (a Node.js framework) for our backend. For our database, we are using MongoDB.

## Frontend

The frontend will be the web endpoint for our application and will be the main point of interaction for our users. Our application uses Next.js (a React framework) for our frontend.

# Continous Integration/Continous Deployment(CI/CD)

We also use the GCP's Cloud Build service to build our apps. Cloud Build service helps to automatically update and deploy changes to our application as soon as a push to the main brach of the repositories has been detected. Using two seperate repositories enables us to customize build commands specific to the repository and also deploy changes to our frontend or backend independently of each other. For example, if we have a minor change to our frontend(for example, correcting a spelling mistake), we only have to push the changes to the main branch of the frontend repository. This will automatically trigger the build and deployment process only for the frontend, leaving our backend untouched, accelerating our build and deployment process. Each repository has a cloudbuild.yaml file. The file instructs the Cloud Build service on how to build and deploy our application. We can also give commands to test our application which enables us to do automated testing before the application is deployed.

# Authentication

Internally, our application uses JWT tokens for authenticating our users. JWT tokens are digitally signed by our backend based on a secret key. The tokens can be verified by our server, using the secret key, for secure requests(accessing/changing the users personal information or payment). JWT tokens enable our application to be highly scalable as there is no need to have a central storage that stores our session tokens. When the user logins, we provide two JWT tokens, one session token and one refresh token. The session token is a short-lived token(expires in two hours) that is the primary token that is verified for all secure requests. For every secure request, the client is expected to provide the token in the Authorization request header as part of the Bearer authentication scheme. We do not use cookies for our session tokens as cookies are automatically submitted by the browser for requests and malicious websites can use a CSRF attack to successfully trigger secure requests to our backend without the knowledge of the client, causing massive damage. Our refresh token is stored in a browser cookie with the HttpOnly flag set. This causes the refresh token to be inaccessible to the frontend script. If our website was vulnerable to an XSS attack, only the session token will be exposed and since the session token is short-lived, only limited damage can be caused. The client uses the refresh token to obtain a new session token upon expiry which makes it convenient for our users as they do not have to login again.
