/*
WARNING: DO NOT run this scipt unless you've made a backup of the database. To make a backup:

1. Quit mysql.
2. Run this command:

mysqldump -u cs340_<onid> -h classmysql.engr.oregonstate.edu -p cs340_<onid> > backups/backup_<date>.sql

* Replace <onid> with your ONID username.
* Replace <date> with the current date. For example: 2023_05_09_1737.

Enter your password when prompted.

Then, to reset the database, run these commands:

mysql -u cs340_<onid> -h classmysql.engr.oregonstate.edu -p
use cs340_<onid>
source database/reset_db.sql

*/
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `ActorRoles`;
DROP TABLE IF EXISTS `Actors`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Memorabilia`;
DROP TABLE IF EXISTS `MovieItems`;
DROP TABLE IF EXISTS `Movies`;
DROP TABLE IF EXISTS `Orders`;
SET FOREIGN_KEY_CHECKS = 1;
source ./database/DDL.sql
SHOW TABLES;
source show_tables.sql