# Group 59 - CS340 Project

## Citations
Much of this project was adapted from the OSU CS340 Ecampus NodeJS starter app code.

Date: May-June 2023

Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

Each file adapted from the starter code includes a citation. If a file does not include a citation, assume it is original work of the project authors, Will Tripp and Seth Stephanz. Pages with original work only include index.hbs, main.hbs, README.md, style.css, reset_db.sql, and show_tables.sql.  

## Project Setup
Connect to the Flip server using the VPN. 

Clone this repo.
```
git clone git@github.com:wtripp/cs340-project.git
```
Add a `.env` to the top directory of this repo. In it, add your port number and OSU username and password info. This file is ignored by Git, so we each can have our ohy and enables us to both connect to our OSU databases to test the app.
```
PORT=<port-number>
DB_HOST=classmysql.engr.oregonstate.edu
DB_USER=cs340_<onid>
DB_PASSWORD=<onid_pw>
DATABASE=cs340_<onid>
```
Install the Node app.
```
npm install
```
This will add all the dependencies in the node_modules folder, which is huge and ignored by Git.


## Start the App
You can start the app locally using Node. I recommend using this while things are in progress, because you can see the SQL errors in the terminal.
```
node app.js
```
To get it to the Flip server, use `forever`, which is installed in the app. First, set up a shortcut to the forever command in `node_modules`.
```
alias forever='./node_modules/forever/bin/forever'
```
Then, push it to the Flip server you're on.
```
forever start app.js
```
If you need to stop it, use this command.
```
forever start app.js
```
If a port is in use, kill what's running on the port. First, look for the process ID (PID) that's running on the port.
```
lsof -i :<port_number>
```
Then, kill that process.
```
kill <PID>
```

## Resetting the Database
Use this procedure if you need to reset the database, such as to remove test data you added or if you change the schema.
First, make a backup of the database.
```
mysqldump -u cs340_<onid> -h classmysql.engr.oregonstate.edu -p cs340_<onid_pw> > backups/backup_<YYYY_MM_DD_HHMM>.sql
```
Then, start mysql and enter your ONID password when prompted.
```
mysql -u cs340_<onid> -h classmysql.engr.oregonstate.edu -p
```
Switch to your database.
```
use cs340_<onid>
```
Run this script.
```
source database/reset_db.sql
```
This script does the following:
1. Disables foreign key checks.
2. Drops all tables in the project from the cs340_<onid> database. If you have other tables you don't want in there, you'll have to delete them manually using DROP TABLE <table_name>.
3. Re-enables foreign key checks.
4. Runs the database/DDL.sql that re-creates all tables in the schema and adds sample rows.
5. Displays all tables and all the contents of each table.