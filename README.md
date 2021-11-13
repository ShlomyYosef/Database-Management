# Database-Management <br><br>

Management DB based on user permissions set by the Admin user.<br>

based on JavaScript with ejs,express,passport,http,router,MongoDB.<br>
<br>
Deploying with Heroku<br>
https://databasemanagement1.herokuapp.com/
<br>

installation guide : <br>
1.git clone https://github.com/ShlomyYosef/Database-Management.git <br>
2.cd to the new folder<br>
3.npm install<br>
4.npm start<br>
5.go to localhost:8080<br>
6. login as user to see clients list or login as Admin to add users.<br><br>
Admin<br> username: Admin <br>password: admin<br><br>
User<br>username: shlomka<br> password: 123<br>

Admin:<br>
● Show the existing Users ✅<br>
● Add and remove Users✅<br>
<br>
User :<br>
● Show the existing clients ✅<br>
● Add and remove clients✅<br>
● Filter the clients (e.g. all the clients with the surname “Cohen”) ✅<br>
● Input fields validated ✅ <br>
● When adding a new client, using IP API and store the geo data from it (city,
country)  https://ip-api.com/ ✅<br>
● ID field validated according to Israeli ID validation guidelines ✅<br>

<br>
*only authenticated Users can get access clients list.<br>
*only authenticated Admin can get access Users list.<br>
