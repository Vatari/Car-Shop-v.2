# Car-Shop-v.2

Simple website for selling and listing cars created by express and handlebars for back-end.
It uses own REST server and MongoDB Atlas as database for the backend.

Supported functionality: login, register, logout, create, edit, search and delete.
Authorization for users uses JWT token. Passwords for users are stored hashed in database using Bcrypt.

package.json for client installs lite-server, lit-html and mocha for testing.

package.json install express and some other libraries nedeed

live demo here: http://85.130.31.118:2210

 Local installation:

1. Download zipped folder
2. open server folder and run npm i
3. start REST server using : nodemon index.js (in server folder, this will start REST service)
4. open client folder in terminal and run npm i
5. run "npm run local" in client folder (this will start client)
6. browser shoud open at http://localhost:4000 or http://127.0.0.1:4000
7. enjoy

To run tests use "npm test" in client folder
