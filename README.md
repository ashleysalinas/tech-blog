# tech-blog
Week 14 - MVC assignment for the Trilogy/Southern Methodist University Web Development Bootcamp


## About
This project was created for Week 14 - MVC of the Trilogy/Southern Methodist University Web Development Bootcamp. It is a blog web application that allows registered users to make posts and respond to others through comments.

## Built With
* Handlebars.js
* NodeJS
  * Express
* MySQl (ClearDB for Heroku)

## Deployment
The site is deployed <a href="https://techblog14mvc.herokuapp.com/"> here.</a>.

## Getting Started
 To make a local copy, use the directions below.
  Prerequisites:
  * A familiarity with MySQL and MySQL Work Bench (used to view your database). Information on this topic can be found <a href="https://www.mysqltutorial.org/">here</a>.
   
  
  Step 1. Clone the repo
  ``` git clone https://github.com/ashleysalinas/tech-blog.git ```
  
  Step 2. CD into local copy folder 
  ``` cd tech-blog ```
  
  Step 3. Add a .env file to your project, not only to protect your SQL login credentials but to allow for the connection in the index.js file.
  ``` touch .env ```
  Then use your favorite code editor to enter the information below into your .env file.
  
  DB_NAME = (the database you would like to use)
  DB_USER = (your SQL username)
  DB_PASSWORD = (your SQL password) 
  
  Step 4. Start your local server using Node in the CLI
  ``` node server.js ```
  
  
  
 
 ## License
 Distributed under the MIT Licencse.
