# **World Music**

## `Authors`

Jiawei Jiang </br>
Justin Schopick </br>
Kushagra Singh

## `Overview`

World Music displays big data gathered, cleaned, and aggregated from over 1.5 million Twitter accounts on a map.

**The Goal:**
* Determine what genres are most preferred in different countries around the world by finding the location of users on Twitter that follow music artists.

**The Benefit:**
* World Music can reveal the regular pattern of the primary music preference in different parts of the world. This can help music providers provide and suggest music to the users in different regions and supply data support to anthropological and sociological studies.

## `Technologies Used`

### **Languages and Frameworks**

React.js: A JavaScript library for building user interfaces. Used create-react-app to bootstrap the application. </br> https://reactjs.org/

Node.js: An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. </br> https://nodejs.org/en/about/

Express.js: A minimal and flexible Node.js web application framework. </br>
https://expressjs.com/

MySQL: An open-source relational database management system. </br> https://www.mysql.com/

Python: A high-level programming language. </br> https://www.python.org/

Java: A high-level programming language. </br> https://docs.oracle.com/en/java/

Hadoop: A framework that allows for the distributed processing of large data sets across clusters of computers. </br> https://hadoop.apache.org

MapReduce: A programming model that enables massive scalability across servers in a Hadoop cluster. </br> https://hadoop.apache.org/docs/r1.2.1/index.html#MapReduce

### **Application Programming Interfaces**

Mapbox: An open source mapping platform for custom designed maps. </br> https://www.mapbox.com/api-documentation/

Twitter: An online news and social networking service. </br> https://developer.twitter.com/

iTunes: A media player and library developed by Apple. </br> https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/

Nominatim: MapQuest search tool that relies on data contributed to OpenStreetMap. </br> https://developer.mapquest.com/documentation/open/nominatim-search/

Material-UI: React.js components that implement Google's Material Design. </br> https://material-ui.com/

## `Prerequisites`

### Cloning this Repository

Navigate to the desired location on your computer. Enter the following command in your terminal:
```
git clone https://github.com/jschopick/cs179G_WorldMusic.git
```

### Adding a Mapbox API Key

Create an access key for the Mapbox API here: https://www.mapbox.com/account/ <br>
**Note:** You will need to create a Mapbox account if you do not have one.

Navigate to the cloned repository in your terminal. Create a folder called config in the src directory by entering the following command:
```
mkdir world-music-client/src/config/
```
Create a file called MAPBOX.js in this new folder and add the following into the file.
```
module.exports = {
    key: '[Insert your public access token]'
};
```
Replace [Insert your public access token] with the public access token that you created.

### Installing Node

Check to see if you have Node.js and npm installed by running the following commands in your terminal:
```
node -v
npm -v
```
**Note:** This application was developed using Node.js version 8.12.0 and npm version 6.4.1. Unexpected errors may occur when attempting to run the application with an older version of Node.js or npm.

If you do not have these installed, go to this website: https://nodejs.org/en/download/<br>
Select the version for your operating system and install it.

### Installing MySQL

If you do not have the MySQL Workbench and MySQL Server installed, go to this website:
https://dev.mysql.com/downloads/mysql/ </br>
Select the version for your operating system, follow the instructions for installing the MySQL Installer, and make sure to install at least the MySQL Workbench and MySQL Server through the MySQL Installer interface.
**Note:** This application was developed using MySQL version 8.0.13. Unexpected errors may occur when attempting to set up a MySQL database with a different version of MySQL installed.

## `How to Run`

### Starting the Database

See the [DBSETUP.md](world-music-api/DBSETUP.md) file for details. </br>
If you already have the database set up, simply open the workbench connection and start the server as shown in Step 2.

### Open a second terminal and navigate to the world-music-api directory. 

If this is your first time running the project, type the following command to download all dependencies:
```
npm install
```
Start the back-end server on localhost:8000 by running the following command:
```
npm start
```
If the database server is running, you should see the following message in your terminal: "Connected to MySQL Database"

### Starting the front-end

Open a terminal and navigate to the world-music-client directory.

If this is your first time running the project, type the following command to download all dependencies:
```
npm install
```
Start the front-end server and automatically load a local webpage at localhost:3000 by running the following command:
```
npm start
```

## `License`

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.