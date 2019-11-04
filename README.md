# 401-lab-13

Heroku:
https://sarahduv-401-lab-13.herokuapp.com/

Travis:
https://travis-ci.com/sarahduv/401-lab-13/builds/134305791

Image:
![image](https://github.com/sarahduv/401-lab-13/blob/master/assets/image.jpg?raw=true)

To this point, our auth-server is able to handle Basic Authentication (user provides a username + password) and Oauth (user authenticates through a 3rd party). When a “good” login happens, the user is provided a JWT signed “Token” from our auth-server.

This lab will have you operating on the /signin route to add support for Token based authentication (“Bearer Auth”) using a token that you can obtain from performing the above activities.

You’ll be required to wire up Bearer auth properly and then to dive in deeper and add some security measures to the tokens to prevent misuse and fraud.

Before you begin
Refer to Getting Started in the lab submission instructions for complete setup, configuration, deployment, and submission instructions.

Getting Started
You’ll need copy the contents of the auth-server folder into a new git repository for this lab, install your dependencies, setup your npm script commands, and pull in your config files
You will need to create a .env file with:
MONGODB_URI
PORT
SECRET
Requirements
Implement a Bearer Authentication system with optional token expiry, api keys, and single use tokens.

Assignment 1: Install the core bearer authorization system
middleware.js - Handle the Bearer Header to pull and verify with the token
users-model.js - Add a bearer authorization method that verifies the token
Create a few users+passwords to test with
