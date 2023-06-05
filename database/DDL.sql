/* 
Database definition queries that define the Movie Memories database schema and insert sample data
Will Tripp and Seth Stephanz (CS340 - Group 59 Portfolio Project)

This code was generated initially using phpMyAdmin, version 5.2.1-1.el7.remi
- https://www.phpmyadmin.net/
- Date: 4/30/23
*/

-- These two SET commands were taken from the assignment description:
-- https://canvas.oregonstate.edu/courses/1914747/assignments/9180999?module_item_id=23040579
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Customers table and insert data
CREATE OR REPLACE TABLE `Customers` (
    `customer_id` int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `phone` varchar(50) DEFAULT NULL,
    `email` varchar(50) NOT NULL UNIQUE,
    `address` varchar(200) NOT NULL,
    `city` varchar(30) DEFAULT NULL,
    `state` varchar(30) DEFAULT NULL,
    `postal_code` varchar(10) NOT NULL,
    PRIMARY KEY (customer_id)
);

-- Tripp, W (April 2023) Citing data generated for Customers table: Mockaroo (https://mockaroo.com)
INSERT INTO
    `Customers` (
        `first_name`,
        `last_name`,
        `phone`,
        `email`,
        `address`,
        `city`,
        `state`,
        `postal_code`
    )
VALUES
    (
        'Cordula',
        'de Courcey',
        '202-430-1819',
        'cdecourcey1@dyndns.org',
        '353 Buhler Avenue',
        'Philadelphia',
        'Pennsylvania',
        '19104'
    ),
    (
        'Donia',
        'Calderhead',
        NULL,
        'dcalderhead2@netscape.com',
        '1 Pepper Wood Hill',
        'Chicago',
        NULL,
        '60620'
    ),
    (
        'Sarena',
        'Vasse',
        '349-502-4035',
        'svasse3@gmail.com',
        '17 Oxford Parkway',
        'Cambridge',
        'Massachusetts',
        '02138'
    ),
    (
        'Liuka',
        'Vasse',
        '213-333-8701',
        'lfyndon4@gmail.com',
        '17 Oxford Parkway',
        'Cambridge',
        'Massachusetts',
        '02138'
    );

-- Create Orders table and insert data
CREATE OR REPLACE TABLE `Orders` (
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

INSERT INTO
    `Orders` (
        `order_date`,
        `ship_date`,
        `delivered_date`,
        `comment`,
        `customer_id`
    )
VALUES
    (
        '2022-06-22 00:00:00',
        '2022-06-23 00:00:00',
        '2022-07-01 00:00:00',
        'put in backyard',
        1
    ),
    (
        '2022-08-14 00:00:00',
        '2022-08-15 00:00:00',
        '2022-08-29 00:00:00',
        NULL,
        2
    ),
    (
        '2022-12-06 00:00:00',
        '2022-12-06 00:00:00',
        '2022-12-23 00:00:00',
        NULL,
        3
    ),
    (
        '2023-03-28 00:00:00',
        '2023-03-29 00:00:00',
        NULL,
        'beware of dog',
        4
    ),
    ('2023-03-28 00:00:01', NULL, NULL, NULL, 4);

-- Create Memorabilia table and insert data
CREATE OR REPLACE TABLE `Memorabilia` (
    `item_id` int(11) AUTO_INCREMENT NOT NULL,
    `description` varchar(100) NOT NULL UNIQUE,
    `type` enum('script', 'prop', 'wardrobe', 'poster') NOT NULL,
    `condition` enum('new', 'excellent', 'good', 'fair', 'poor') NOT NULL,
    `price` decimal(6, 2) NOT NULL,
    `order_id` int(11) DEFAULT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(item_id)
);

INSERT INTO
    `Memorabilia` (
        `description`,
        `type`,
        `condition`,
        `price`,
        `order_id`
    )
VALUES
    (
        'Batman\'s cape',
        'wardrobe',
        'good',
        2000.00,
        1
    ),
    (
        'Godfather script signed by Al Pacino',
        'script',
        'fair',
        500.00,
        1
    ),
    (
        'Pulp Fiction rare movie poster',
        'poster',
        'new',
        50.00,
        2
    ),
    (
        'Jason Voorhees\'s machete',
        'prop',
        'excellent',
        1000.00,
        3
    ),
    (
        'Patrick Bateman\'s business card',
        'prop',
        'good',
        75.00,
        4
    ),
    (
        'The Dude\'s robe',
        'wardrobe',
        'fair',
        150.00,
        5
    ),
    (
        'Toy Story movie script signed by Tom Hanks',
        'script',
        'poor',
        100.00,
        NULL
    );

-- Create Movies table and insert data
CREATE OR REPLACE TABLE `Movies` (
    `movie_id` int(11) AUTO_INCREMENT NOT NULL,
    `title` varchar(100) NOT NULL,
    `year` year(4) NOT NULL,
    `genre` varchar(20) DEFAULT NULL,
    PRIMARY KEY (movie_id),
    CONSTRAINT UNIQUE(movie_id),
    CONSTRAINT UNIQUE(title, year)
);

INSERT INTO
    `Movies` (`title`, `year`, `genre`)
VALUES
    ('Batman Begins', '2005', 'action'),
    ('The Dark Knight', '2008', 'action'),
    ('The Godfather', '1972', 'drama'),
    ('Pulp Fiction', '1994', NULL),
    ('Friday the 13th', '1980', 'horror'),
    ('American Psycho', '2000', 'thriller'),
    ('The Big Lebowski', '1998', 'comedy'),
    ('Toy Story', '1995', 'animation');

-- Create MovieItems table and insert data
CREATE OR REPLACE TABLE `MovieItems` (
    `movie_item_id` int(11) AUTO_INCREMENT NOT NULL,
    `item_id` int(11) NOT NULL,
    `movie_id` int(11) NOT NULL,
    PRIMARY KEY (movie_item_id),
    FOREIGN KEY (item_id) REFERENCES Memorabilia(item_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(movie_item_id),
    CONSTRAINT UNIQUE(item_id, movie_id)
);

INSERT INTO
    `MovieItems` (`item_id`, `movie_id`)
VALUES
    ((SELECT item_id FROM Memorabilia WHERE description = 'Batman''s cape'),
     (SELECT movie_id FROM Movies WHERE title = 'Batman Begins' AND year = '2005')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Batman''s cape'),
     (SELECT movie_id FROM Movies WHERE title = 'The Dark Knight' AND year = '2008')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Godfather script signed by Al Pacino'),
     (SELECT movie_id FROM Movies WHERE title = 'The Godfather' AND year = '1972')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Pulp Fiction rare movie poster'),
     (SELECT movie_id FROM Movies WHERE title = 'Pulp Fiction' AND year = '1994')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Jason Voorhees''s machete'),
     (SELECT movie_id FROM Movies WHERE title = 'Friday the 13th' AND year = '1980')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Patrick Bateman''s business card'),
     (SELECT movie_id FROM Movies WHERE title = 'American Psycho' AND year = '2000')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'The Dude''s robe'),
     (SELECT movie_id FROM Movies WHERE title = 'The Big Lebowski' AND year = '1998')),

    ((SELECT item_id FROM Memorabilia WHERE description = 'Toy Story movie script signed by Tom Hanks'),
     (SELECT movie_id FROM Movies WHERE title = 'Toy Story' AND year = '1995'));

-- Create Actors table and insert data
CREATE OR REPLACE TABLE `Actors` (
    `actor_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    PRIMARY KEY (actor_id),
    CONSTRAINT UNIQUE(actor_id),
    CONSTRAINT UNIQUE(first_name, last_name)
);

INSERT INTO
    `Actors` (`first_name`, `last_name`)
VALUES
    ('Christian', 'Bale'),
    ('Al', 'Pacino'),
    ('Uma', 'Thurman'),
    ('Tom', 'Hanks'),
    ('Meryl', 'Streep'),
    ('Jeff', 'Bridges'),
    ('Julianne', 'Moore');

-- Create ActorRoles table and insert data
CREATE OR REPLACE TABLE `ActorRoles` (
    `actor_role_id` int(11) NOT NULL AUTO_INCREMENT,
    `movie_id` int(11) NOT NULL,
    `actor_id` int(11) NOT NULL,
    PRIMARY KEY (actor_role_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(actor_role_id),
    CONSTRAINT UNIQUE(movie_id, actor_id)
);

INSERT INTO
    `ActorRoles` (`movie_id`, `actor_id`)
VALUES
    ((SELECT movie_id FROM Movies WHERE title = 'Batman Begins' AND year = '2005'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Christian' AND last_name = 'Bale')),

    ((SELECT movie_id FROM Movies WHERE title = 'The Dark Knight' AND year = '2008'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Christian' AND last_name = 'Bale')),

    ((SELECT movie_id FROM Movies WHERE title = 'The Godfather' AND year = '1972'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Al' AND last_name = 'Pacino')),

    ((SELECT movie_id FROM Movies WHERE title = 'Pulp Fiction' AND year = '1994'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Uma' AND last_name = 'Thurman')),

    ((SELECT movie_id FROM Movies WHERE title = 'American Psycho' AND year = '2000'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Christian' AND last_name = 'Bale')),

    ((SELECT movie_id FROM Movies WHERE title = 'The Big Lebowski' AND year = '1998'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Jeff' AND last_name = 'Bridges')),

    ((SELECT movie_id FROM Movies WHERE title = 'The Big Lebowski' AND year = '1998'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Julianne' AND last_name = 'Moore')),

    ((SELECT movie_id FROM Movies WHERE title = 'Toy Story' AND year = '1995'),
     (SELECT actor_id FROM Actors WHERE first_name = 'Tom' AND last_name = 'Hanks'));

-- These two commands were taken from the assignment description:
-- https://canvas.oregonstate.edu/courses/1914747/assignments/9180999?module_item_id=23040579
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;