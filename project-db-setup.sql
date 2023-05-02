
-- Create Customers table and insert data
CREATE TABLE `Customers` (
  `customer_id` int(11) AUTO_INCREMENT NOT NULL UNIQUE,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL,
  PRIMARY KEY (customer_id),
  CONSTRAINT UNIQUE(customer_id)
);

INSERT INTO `Customers` (`first_name`, `last_name`, `phone`, `email`, `address`, `city`, `state`, `postal_code`) VALUES
('Cordula', 'de Courcey', '202-430-1819202-430-1819', 'cdecourcey1@dyndns.org', '353 Buhler Avenue', 'Philadelphia', 'Pennsylvania', '19104'),
('Donia', 'Calderhead', NULL, 'dcalderhead2@netscape.com', '1 Pepper Wood Hill', 'Chicago', NULL, '60620'),
('Sarena', 'Vasse', '349-502-4035', 'svasse3@gmail.com', '17 Oxford Parkway', 'Cambridge', 'Massachusetts', '02138'),
('Liuka', 'Vasse', '213-333-8701', 'lfyndon4@gmail.com', '17 Oxford Parkway', 'Cambridge', 'Massachusetts', '02138');

-- create Orders table and insert data
CREATE TABLE `Orders` (
  `order_id` int(11) AUTO_INCREMENT NOT NULL,
  `order_date` datetime NOT NULL,
  `ship_date` datetime DEFAULT NULL,
  `delivered_date` datetime DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT UNIQUE(order_id)
);

INSERT INTO `Orders` (`order_date`, `ship_date`, `delivered_date`, `comment`, `customer_id`) VALUES
('2022-06-22 00:00:00', '2022-06-23 00:00:00', '2022-07-01 00:00:00', 'put in backyard', 1),
('2022-08-14 00:00:00', '2022-08-15 00:00:00', '2022-08-29 00:00:00', NULL, 2),
('2022-12-06 00:00:00', '2022-12-06 00:00:00', '2022-12-23 00:00:00', NULL, 3),
('2023-03-28 00:00:00', '2023-03-29 00:00:00', NULL, 'beware of dog', 4),
('2023-03-28 00:00:00', NULL, NULL, NULL, 4);

-- create Memorabilia table and insert data
CREATE TABLE `Memorabilia` (
  `item_id` int(11) AUTO_INCREMENT NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` enum('script','prop','wardrobe','poster') NOT NULL,
  `condition` enum('new','excellent','good','fair','poor') NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT UNIQUE(item_id)
);

INSERT INTO `Memorabilia` (`description`, `type`, `condition`, `price`, `order_id`) VALUES
('Batman\'s cape', 'wardrobe', 'good', 2000.00, 1),
('Godfather script signed by Al Pacino', 'script', 'fair', 500.00, 1),
('Pulp Fiction rare movie poster', 'poster', 'new', 50.00, 2),
('Jason Voorhees\'s machete', 'prop', 'excellent', 1000.00, 3),
('Patrick Bateman\'s business card', 'prop', 'good', 75.00, 4),
('The Dude\'s robe', 'wardrobe', 'fair', 150.00, 5),
('Toy Story movie script signed by Tom Hanks', 'script', 'poor', 100.00, NULL);

-- Create Movies table and insert data
-- !! Needs to be created and filled before MovieItems and ActorRoles, otherwise will need to be altered !!
CREATE TABLE `Movies` (
  `movie_id` int(11) AUTO_INCREMENT NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `genre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (movie_id),
  CONSTRAINT UNIQUE(movie_id)
);

INSERT INTO `Movies` (`title`, `year`, `genre`) VALUES
('Batman Begins', '2005', 'action'),
('The Dark Knight', '2008', 'action'),
('The Godfather', '1972', 'drama'),
('Pulp Fiction', '1994', NULL),
('Friday the 13th', '1980', 'horror'),
('American Psycho', '2000', 'thriller'),
('The Big Lebowski', '1998', 'comedy'),
('Toy Story', '1995', 'animation');

-- Create MovieItems table and insert data
CREATE TABLE `MovieItems` (
  `movie_item_id` int(11) AUTO_INCREMENT NOT NULL,
  `item_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY UNIQUE(movie_item_id),
  FOREIGN KEY (item_id) REFERENCES Memorabilia(item_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT UNIQUE(movie_item_id)
);

INSERT INTO `MovieItems` (`item_id`, `movie_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8);

-- Create Actors table and insert data
CREATE TABLE `Actors` (
  `actor_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  PRIMARY KEY (actor_id),
  CONSTRAINT UNIQUE(actor_id)
);

INSERT INTO `Actors` (`first_name`, `last_name`) VALUES
('Christian', 'Bale'),
('Al', 'Pacino'),
('Uma', 'Thurman'),
('Tom', 'Hanks'),
('Meryl', 'Streep'),
('Jeff', 'Bridges'),
('Julianne', 'Moore');

-- Create ActorRoles table and insert data
CREATE TABLE `ActorRoles` (
  `actor_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  PRIMARY KEY (actor_role_id),
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT UNIQUE(actor_role_id)
);

INSERT INTO `ActorRoles` (`movie_id`, `actor_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(6, 1),
(7, 6),
(7, 7),
(8, 4);
