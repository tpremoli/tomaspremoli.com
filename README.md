# TomasPremoli.com
## Introduction

tomaspremoli.com is my personal portfolio website. It is a dynamic website, meaning I can modify its contents without having to redeploy the application. The design allows me to update my education, my work experiences,  and skills, along with adding more portfolio entries and updating my picture & CV. Beyond that, the app is fully responsive (Hello mobile users!)

There's not much more to say here... You're on the site; **explore it!** 

## Technologies used

The application was built using Django for the backend, and React for the frontend. This is my second Django-React app, and I must say, it is much cleaner and more powerful than my first attempt.

Beyond that, this application was launched on AWS Elastic Beanstalk, using an RDS database for storing individual db entries, and an s3 bucket to hold all the media. This really opened my eyes as to how much easier deploying an application could be, and the benefits I could get from using different AWS services to my advantage. In the future I will take the same approach.

## Prerequisites:
In the root directory (/tomas_premoli) run:

    pip install -r requirements.txt

Beyond that, npm package manager is necessary to run the javascript libraries.
In /tomas_premoli/Frontend:

    npm i webpack webpack-cli
    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react 
    npm i react react-dom 
    npm i react-router-dom 
    npm i @mui/material @emotion/react @emotion/styled @mui/icons-material 
    npm i @babel/plugin-proposal-class-properties 

To actually run it:

    npm run dev
