This directory contains all code used in the back-end for the project.

## `Back-end Server`

### Starting the Database

See the [DBSETUP.md](DBSETUP.md) file for details. </br>
Once your database is set up, you simply need to start the database before running the server.
**Note:** If you do not start the MySQL server on localhost, you will be unable to access the database. </br>

### Running the Server

If this is your first time running the project, type the following command to download all dependencies:
```
npm install
```
Start the back-end server on localhost:8000 by running the following command:
```
npm start
```
The page will reload if you make edits.

### Routes for Information

In your browser, navigate to the following links to access the information in the database:

* [http://localhost:8000/api](http://localhost:8000/api): All information stored in the database.
* [http://localhost:8000/api/genres](http://localhost:8000/api/genres): All genres stored in the database.
* [http://localhost:8000/api/artists](http://localhost:8000/api/artists): All artists stored in the database.
* [http://localhost:8000/api/countryname](http://localhost:8000/api/countryname): All country names stored in the database.
* [http://localhost:8000/api/countrycode](http://localhost:8000/api/countrycode): All country codes stored in the database.