-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2023 at 03:59 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_trippw`
--

-- --------------------------------------------------------

--
-- Table structure for table `ActorRoles`
--

CREATE TABLE `ActorRoles` (
  `actor_role_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ActorRoles`
--

INSERT INTO `ActorRoles` (`actor_role_id`, `movie_id`, `actor_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 3),
(5, 6, 1),
(6, 7, 6),
(7, 7, 7),
(8, 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Actors`
--

CREATE TABLE `Actors` (
  `actor_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Actors`
--

INSERT INTO `Actors` (`actor_id`, `first_name`, `last_name`) VALUES
(1, 'Christian', 'Bale'),
(2, 'Al', 'Pacino'),
(3, 'Uma', 'Thurman'),
(4, 'Tom', 'Hanks'),
(5, 'Meryl', 'Streep'),
(6, 'Jeff', 'Bridges'),
(7, 'Julianne', 'Moore');

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customer_id`, `first_name`, `last_name`, `phone`, `email`, `address`, `city`, `state`, `postal_code`) VALUES
(1, 'Cordula', 'de Courcey', '202-430-1819202-430-1819', 'cdecourcey1@dyndns.org', '353 Buhler Avenue', 'Philadelphia', 'Pennsylvania', '19104'),
(2, 'Donia', 'Calderhead', NULL, 'dcalderhead2@netscape.com', '1 Pepper Wood Hill', 'Chicago', NULL, '60620'),
(3, 'Sarena', 'Vasse', '349-502-4035', 'svasse3@gmail.com', '17 Oxford Parkway', 'Cambridge', 'Massachusetts', '02138'),
(4, 'Liuka', 'Vasse', '213-333-8701', 'lfyndon4@gmail.com', '17 Oxford Parkway', 'Cambridge', 'Massachusetts', '02138');

-- --------------------------------------------------------

--
-- Table structure for table `Memorabilia`
--

CREATE TABLE `Memorabilia` (
  `item_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` enum('script','prop','wardrobe','poster') NOT NULL,
  `condition` enum('new','excellent','good','fair','poor') NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Memorabilia`
--

INSERT INTO `Memorabilia` (`item_id`, `description`, `type`, `condition`, `price`, `order_id`) VALUES
(1, 'Batman\'s cape', 'wardrobe', 'good', 2000.00, 1),
(2, 'Godfather script signed by Al Pacino', 'script', 'fair', 500.00, 1),
(3, 'Pulp Fiction rare movie poster', 'poster', 'new', 50.00, 2),
(4, 'Jason Voorhees\'s machete', 'prop', 'excellent', 1000.00, 3),
(5, 'Patrick Bateman\'s business card', 'prop', 'good', 75.00, 4),
(6, 'The Dude\'s robe', 'wardrobe', 'fair', 150.00, 5),
(7, 'Toy Story movie script signed by Tom Hanks', 'script', 'poor', 100.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MovieItems`
--

CREATE TABLE `MovieItems` (
  `movie_item_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MovieItems`
--

INSERT INTO `MovieItems` (`movie_item_id`, `item_id`, `movie_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4),
(5, 4, 5),
(6, 5, 6),
(7, 6, 7),
(8, 7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `Movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `genre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Movies`
--

INSERT INTO `Movies` (`movie_id`, `title`, `year`, `genre`) VALUES
(1, 'Batman Begins', '2005', 'action'),
(2, 'The Dark Knight', '2008', 'action'),
(3, 'The Godfather', '1972', 'drama'),
(4, 'Pulp Fiction', '1994', NULL),
(5, 'Friday the 13th', '1980', 'horror'),
(6, 'American Psycho', '2000', 'thriller'),
(7, 'The Big Lebowski', '1998', 'comedy'),
(8, 'Toy Story', '1995', 'animation');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `ship_date` datetime DEFAULT NULL,
  `delivered_date` datetime DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`order_id`, `order_date`, `ship_date`, `delivered_date`, `comment`, `customer_id`) VALUES
(1, '2022-06-22 00:00:00', '2022-06-23 00:00:00', '2022-07-01 00:00:00', 'put in backyard', 1),
(2, '2022-08-14 00:00:00', '2022-08-15 00:00:00', '2022-08-29 00:00:00', NULL, 2),
(3, '2022-12-06 00:00:00', '2022-12-06 00:00:00', '2022-12-23 00:00:00', NULL, 3),
(4, '2023-03-28 00:00:00', '2023-03-29 00:00:00', NULL, 'beware of dog', 4),
(5, '2023-03-28 00:00:00', NULL, NULL, NULL, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ActorRoles`
--
ALTER TABLE `ActorRoles`
  ADD PRIMARY KEY (`actor_role_id`),
  ADD UNIQUE KEY `actor_role_id_UNIQUE` (`actor_role_id`),
  ADD KEY `actor_id_idx` (`actor_id`),
  ADD KEY `movie_id_idx` (`movie_id`);

--
-- Indexes for table `Actors`
--
ALTER TABLE `Actors`
  ADD PRIMARY KEY (`actor_id`),
  ADD UNIQUE KEY `actor_id_UNIQUE` (`actor_id`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_id_UNIQUE` (`customer_id`);

--
-- Indexes for table `Memorabilia`
--
ALTER TABLE `Memorabilia`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `item_id_UNIQUE` (`item_id`),
  ADD KEY `order_id_idx` (`order_id`);

--
-- Indexes for table `MovieItems`
--
ALTER TABLE `MovieItems`
  ADD PRIMARY KEY (`movie_item_id`),
  ADD UNIQUE KEY `movie_item_id_UNIQUE` (`movie_item_id`),
  ADD KEY `item_id_idx` (`item_id`),
  ADD KEY `movie_id_idx` (`movie_id`);

--
-- Indexes for table `Movies`
--
ALTER TABLE `Movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD UNIQUE KEY `movie_id_UNIQUE` (`movie_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  ADD KEY `customer_id_idx` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ActorRoles`
--
ALTER TABLE `ActorRoles`
  MODIFY `actor_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Actors`
--
ALTER TABLE `Actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Memorabilia`
--
ALTER TABLE `Memorabilia`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ActorRoles`
--
ALTER TABLE `ActorRoles`
  ADD CONSTRAINT `fk_actor_roles_actor_id` FOREIGN KEY (`actor_id`) REFERENCES `Actors` (`actor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_actor_roles_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Memorabilia`
--
ALTER TABLE `Memorabilia`
  ADD CONSTRAINT `fk_memorabilia_order_id` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `MovieItems`
--
ALTER TABLE `MovieItems`
  ADD CONSTRAINT `fk_movie_items_item_id` FOREIGN KEY (`item_id`) REFERENCES `Memorabilia` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_movie_items_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_orders_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
