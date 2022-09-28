Car-Shop-v.2

Simple website for selling and listing cars created by express and handlebars for back-end.
It uses MongoDB Atlas as database for the back-end.

Supported functionality: login, register, logout, create, edit, search and delete.
Passwords for users are stored hashed in database using Bcrypt.

package.json for client installs express and express-handlebars, and some other libraries needed.

live demo: https://project-car-shop.herokuapp.com/

Local installation:

1. Download zipped folder
2. open server folder and run npm i
3. create .env file in root directory and set DB_USERNAME and DB_PASSWORD
4. install MongoDB locally and set address /models/index.js
5. open folder in terminal and run npm i
6. run "npm run local" 
7. open browser at http://localhost:3000 or http://127.0.0.1:3000
8. enjoy
