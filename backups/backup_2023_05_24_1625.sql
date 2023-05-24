-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_trippw
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ActorRoles`
--

DROP TABLE IF EXISTS `ActorRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ActorRoles` (
  `actor_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  PRIMARY KEY (`actor_role_id`),
  UNIQUE KEY `actor_role_id` (`actor_role_id`),
  UNIQUE KEY `movie_id` (`movie_id`,`actor_id`),
  KEY `actor_id` (`actor_id`),
  CONSTRAINT `ActorRoles_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ActorRoles_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `Actors` (`actor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ActorRoles`
--

LOCK TABLES `ActorRoles` WRITE;
/*!40000 ALTER TABLE `ActorRoles` DISABLE KEYS */;
INSERT INTO `ActorRoles` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,3),(5,6,1),(6,7,6),(7,7,7),(8,8,4);
/*!40000 ALTER TABLE `ActorRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Actors`
--

DROP TABLE IF EXISTS `Actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Actors` (
  `actor_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  PRIMARY KEY (`actor_id`),
  UNIQUE KEY `actor_id` (`actor_id`),
  UNIQUE KEY `first_name` (`first_name`,`last_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Actors`
--

LOCK TABLES `Actors` WRITE;
/*!40000 ALTER TABLE `Actors` DISABLE KEYS */;
INSERT INTO `Actors` VALUES (2,'Al','Pacino'),(1,'Christian','Bale'),(6,'Jeff','Bridges'),(7,'Julianne','Moore'),(5,'Meryl','Streep'),(4,'Tom','Hanks'),(3,'Uma','Thurman');
/*!40000 ALTER TABLE `Actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id` (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Cordula','de Courcey','202-430-1819','cdecourcey1@dyndns.org','353 Buhler Avenue','Philadelphia','Pennsylvania','19104'),(2,'Donia','Calderhead',NULL,'dcalderhead2@netscape.com','1 Pepper Wood Hill','Chicago',NULL,'60620'),(3,'Sarena','Vasse','349-502-4035','svasse3@gmail.com','17 Oxford Parkway','Cambridge','Massachusetts','02138'),(4,'Liuka','Vasse','213-333-8701','lfyndon4@gmail.com','17 Oxford Parkway','Cambridge','Massachusetts','02138');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Memorabilia`
--

DROP TABLE IF EXISTS `Memorabilia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Memorabilia` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `type` enum('script','prop','wardrobe','poster') NOT NULL,
  `condition` enum('new','excellent','good','fair','poor') NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `description` (`description`),
  UNIQUE KEY `item_id` (`item_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `Memorabilia_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Memorabilia`
--

LOCK TABLES `Memorabilia` WRITE;
/*!40000 ALTER TABLE `Memorabilia` DISABLE KEYS */;
INSERT INTO `Memorabilia` VALUES (1,'Batman\'s cape','wardrobe','good',2000.00,NULL),(2,'Godfather script signed by Al Pacino','script','fair',500.00,NULL),(3,'Pulp Fiction rare movie poster','poster','new',50.00,NULL),(4,'Jason Voorhees\'s machete','prop','excellent',1000.00,NULL),(5,'Patrick Bateman\'s business card','prop','good',75.00,NULL),(6,'The Dude\'s robe','wardrobe','fair',150.00,NULL),(7,'Toy Story movie script signed by Tom Hanks','script','poor',100.00,NULL);
/*!40000 ALTER TABLE `Memorabilia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MovieItems`
--

DROP TABLE IF EXISTS `MovieItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MovieItems` (
  `movie_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY (`movie_item_id`),
  UNIQUE KEY `movie_item_id` (`movie_item_id`),
  UNIQUE KEY `item_id` (`item_id`,`movie_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `MovieItems_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `Memorabilia` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MovieItems_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MovieItems`
--

LOCK TABLES `MovieItems` WRITE;
/*!40000 ALTER TABLE `MovieItems` DISABLE KEYS */;
INSERT INTO `MovieItems` VALUES (1,1,1),(2,1,2),(3,2,3),(4,3,4),(5,4,5),(6,5,6),(7,6,7),(8,7,8);
/*!40000 ALTER TABLE `MovieItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movies`
--

DROP TABLE IF EXISTS `Movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movies` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `genre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `movie_id` (`movie_id`),
  UNIQUE KEY `title` (`title`,`year`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movies`
--

LOCK TABLES `Movies` WRITE;
/*!40000 ALTER TABLE `Movies` DISABLE KEYS */;
INSERT INTO `Movies` VALUES (1,'Batman Begins',2005,'action'),(2,'The Dark Knight',2008,'action'),(3,'The Godfather',1972,'drama'),(4,'Pulp Fiction',1994,NULL),(5,'Friday the 13th',1980,'horror'),(6,'American Psycho',2000,'thriller'),(7,'The Big Lebowski',1998,'comedy'),(8,'Toy Story',1995,'animation');
/*!40000 ALTER TABLE `Movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` datetime NOT NULL,
  `ship_date` datetime DEFAULT NULL,
  `delivered_date` datetime DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id` (`order_id`),
  UNIQUE KEY `customer_id` (`customer_id`,`order_date`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (76,'2023-05-01 00:00:00','2023-05-02 00:00:00','2023-05-03 00:00:00','a',2),(81,'2023-05-22 00:00:00','2023-05-23 00:00:00','2023-05-25 00:00:00','hello',1),(83,'2023-05-02 00:00:00','2023-05-10 00:00:00','2023-05-19 00:00:00','regsre5t45t45therh',2),(95,'2023-05-09 00:00:00','2023-05-24 00:00:00','2023-05-26 00:00:00','abc',1),(109,'2023-05-11 00:00:00','2023-05-12 00:00:00','2023-05-25 00:00:00','Update',1),(112,'2023-05-21 00:00:00','2023-05-23 00:00:00','2023-05-25 00:00:00','Testing from Matt',1),(114,'2023-05-17 00:00:00','2023-06-01 00:00:00','2023-06-07 00:00:00','',1),(118,'2023-05-01 00:00:00','2023-05-02 00:00:00','2023-05-03 00:00:00','test124',1),(119,'2023-05-01 00:00:00','2023-05-02 00:00:00','2023-05-03 00:00:00','test124',3),(169,'2023-05-30 00:00:00','2023-06-01 00:00:00','2023-06-01 00:00:00','test2',2);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-24 13:25:56
