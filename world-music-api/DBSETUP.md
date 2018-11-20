## Setting up the Database

### Step 1

Open the MySQL Workbench. Create a new connection called WorldMusic on localhost. Use root so you have to change as little source code as possible.

![](images/MySQL1_NewConnection.PNG?raw=true)

**Note:** If you have a password set for the root user, you need to modify the password field in 
[connection.js](connection.js) to include your password instead of an empty password.

### Step 2

Open the Startup/Shutdown instance and start the server.

![](images/MySQL2_StartServer.PNG?raw=true)

### Step 3

Create a new schema called "worldmusic"

![](images/MySQL3_CreateSchema.PNG?raw=true)

### Step 4

Select the worldmusic schema and create a new table with the following setup:

![](images/MySQL4_CreateTable.PNG?raw=true)

### Step 5

Due to some versioning issues, you will need to run the following script for MySQL to recognize your password when the back-end tries to connect.

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''
```

If you have a password set for root, replace '' with '[your password]'

![](images/MySQL5_AlterUser.PNG?raw=true)

## Loading the Data

### Step 6

Identify the path allowed by MySQL's security check to load data from files.

![](images/MySQL6_FindPath.PNG?raw=true)

### Step 7

Copy the ProcessedData.txt file from the world-music-api/data folder into the Uploads folder in your secure path from step 6.

![](images/MySQL7_UploadData.PNG?raw=true)

### Step 8

Load the data into the info table in the worldmusic schema by executing the following script.

```
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/ProcessedData.txt' INTO TABLE info;
```
This is structured as '[your path]/ProcessedData.txt' so be sure to replace the path with your own path.

![](images/MySQL8_LoadDataInTable.PNG?raw=true)

You should see the following confirmation message in the Action Output at the bottom of the screen: </br>
"7911 row(s) affected Records: 7911  Deleted: 0  Skipped: 0  Warnings: 0"