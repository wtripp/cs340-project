-- Database manipulation queries for the Movie Memories database.
-- by Will Tripp and Seth Stephanz (CS340 - Group 59)
-- Variable names are preceded by a colon (:).

/*
NOTES FROM WILL (5/6/23) --
* I added the returned SQL code I got wherever I didn't use variables. Hope this helps.
* I made some guesses on how the HTML might look and what display names and generated columns we might want to use. I will correct things based on the pages you create.
* I ended up creating SQL queries for everything, but I don't think we have to implement all of them in HTML for step 3.
* I thought it might be useful to put Movies and Actors together on one page. On their own they don't do much.
* If we wanted to simplify our design further, I had an idea: Spin off a Regions table from Customers that includes only the regions used by existing customers, then delete Actors. Then we'd still have 5 relationships and 1 M:M. Just a thought if this all becomes too complicated.
* We might want to change the 'condition' attribute to something else. It turns out CONDITION is a reserved keyword. That's why I used backticks for them.
* For many of the entities, I used combinations of attributes so our dropdowns didn't use the IDs. We might want to make some of these attribute combos unique in SQL. I think you mentioned this in an earlier step. It might be time to implement this. Some possible UNIQUE entities:
** Customers: email
** Orders: (order_date, customer_id) -- A customer can't place two orders at the exact same time.
** Memorabilia: description
** Movies: (title, year) -- Unlikely that two movies with the same title would come out in the same year.
** Actors: (first_name, last_name) -- This might not be enough to make unique. We could consider adding a date_of_birth attribute.
* It turns out ENUMs are really annoying for doing INSERTS/UPDATES. I couldn't figure out how to populate them in a dropdown, so we might want to change 'condition' and 'type' in Memorabilia to VARCHAR.
*/

-- CUSTOMERS PAGE --

-- Display all customers.
SELECT customer_id, first_name, last_name, phone, email, address, city, state, postal_code FROM Customers;
/*
+-------------+------------+------------+--------------+---------------------------+--------------------+--------------+---------------+-------------+
| customer_id | first_name | last_name  | phone        | email                     | address            | city         | state         | postal_code |
+-------------+------------+------------+--------------+---------------------------+--------------------+--------------+---------------+-------------+
|           1 | Cordula    | de Courcey | 202-430-1819 | cdecourcey1@dyndns.org    | 353 Buhler Avenue  | Philadelphia | Pennsylvania  | 19104       |
|           2 | Donia      | Calderhead | NULL         | dcalderhead2@netscape.com | 1 Pepper Wood Hill | Chicago      | NULL          | 60620       |
|           3 | Sarena     | Vasse      | 349-502-4035 | svasse3@gmail.com         | 17 Oxford Parkway  | Cambridge    | Massachusetts | 02138       |
|           4 | Liuka      | Vasse      | 213-333-8701 | lfyndon4@gmail.com        | 17 Oxford Parkway  | Cambridge    | Massachusetts | 02138       |
+-------------+------------+------------+--------------+---------------------------+--------------------+--------------+---------------+-------------+
*/

-- Add a new customer.
INSERT INTO Customers (first_name, last_name, phone, email, address, city, state, postal_code)
VALUES (:first_name_input, :last_name_input, :phone_input, :email_input, :address_input, :city_input, :state_input, :postal_code_input);

-- END CUSTOMERS PAGE --


-- ORDERS PAGE --

-- Display all orders.
SELECT o.order_id, o.order_date, o.ship_date, o.delivered_date, o.comment,
       CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_name,
       GROUP_CONCAT(items.description SEPARATOR ', ') AS items_ordered,
       SUM(items.price) AS order_total
FROM Orders AS o
JOIN Customers AS c ON o.customer_id = c.customer_id
JOIN Memorabilia AS items ON items.order_id = o.order_id
GROUP BY o.order_id
ORDER BY o.order_date;
/*
+----------+---------------------+---------------------+---------------------+-----------------+----------------------------------------------+-----------------------------------------------------+-------------+
| order_id | order_date          | ship_date           | delivered_date      | comment         | customer_name                                | items_ordered                                       | order_total |
+----------+---------------------+---------------------+---------------------+-----------------+----------------------------------------------+-----------------------------------------------------+-------------+
|        1 | 2022-06-22 00:00:00 | 2022-06-23 00:00:00 | 2022-07-01 00:00:00 | put in backyard | Cordula de Courcey (cdecourcey1@dyndns.org)  | Batman's cape, Godfather script signed by Al Pacino |     2500.00 |
|        2 | 2022-08-14 00:00:00 | 2022-08-15 00:00:00 | 2022-08-29 00:00:00 | NULL            | Donia Calderhead (dcalderhead2@netscape.com) | Pulp Fiction rare movie poster                      |       50.00 |
|        3 | 2022-12-06 00:00:00 | 2022-12-06 00:00:00 | 2022-12-23 00:00:00 | NULL            | Sarena Vasse (svasse3@gmail.com)             | Jason Voorhees's machete                            |     1000.00 |
|        4 | 2023-03-28 00:00:00 | 2023-03-29 00:00:00 | NULL                | beware of dog   | Liuka Vasse (lfyndon4@gmail.com)             | Patrick Bateman's business card                     |       75.00 |
|        5 | 2023-03-28 00:00:00 | NULL                | NULL                | NULL            | Liuka Vasse (lfyndon4@gmail.com)             | The Dude's robe                                     |      150.00 |
+----------+---------------------+---------------------+---------------------+-----------------+----------------------------------------------+-----------------------------------------------------+-------------+
*/

-- Select customer data used to populate the dropdown that associates a customer with an order. 
SELECT customer_id, CONCAT(first_name, ' ', last_name, ' (', email, ')') AS customer_dropdown_display FROM Customers;
/*
+-------------+----------------------------------------------+
| customer_id | customer_dropdown_display                    |
+-------------+----------------------------------------------+
|           1 | Cordula de Courcey (cdecourcey1@dyndns.org)  |
|           2 | Donia Calderhead (dcalderhead2@netscape.com) |
|           3 | Sarena Vasse (svasse3@gmail.com)             |
|           4 | Liuka Vasse (lfyndon4@gmail.com)             |
+-------------+----------------------------------------------+
*/

-- Add a new order.
INSERT INTO Orders (order_date, ship_date, delivered_date, comment, customer_id)
VALUES (:order_date_input, :ship_date_input, :delivered_date_input, :comment_input, :customer_id_input_from_dropdown);

-- END ORDERS PAGE --


-- MEMORABILIA PAGE --

-- Display all memorabilia items.
SELECT items.item_id, items.description, items.type, items.`condition`, items.price,
        CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ') on ', o.order_date) AS ordered_by
FROM Memorabilia AS items
LEFT JOIN Orders AS o ON items.order_id = o.order_id
LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
ORDER by ordered_by;
/*
+---------+--------------------------------------------+----------+-----------+---------+---------------------------------------------------------------------+
| item_id | description                                | type     | condition | price   | ordered_by                                                          |
+---------+--------------------------------------------+----------+-----------+---------+---------------------------------------------------------------------+
|       7 | Toy Story movie script signed by Tom Hanks | script   | poor      |  100.00 | NULL                                                                |
|       1 | Batman's cape                              | wardrobe | good      | 2000.00 | Cordula de Courcey (cdecourcey1@dyndns.org) on 2022-06-22 00:00:00  |
|       2 | Godfather script signed by Al Pacino       | script   | fair      |  500.00 | Cordula de Courcey (cdecourcey1@dyndns.org) on 2022-06-22 00:00:00  |
|       3 | Pulp Fiction rare movie poster             | poster   | new       |   50.00 | Donia Calderhead (dcalderhead2@netscape.com) on 2022-08-14 00:00:00 |
|       5 | Patrick Bateman's business card            | prop     | good      |   75.00 | Liuka Vasse (lfyndon4@gmail.com) on 2023-03-28 00:00:00             |
|       6 | The Dude's robe                            | wardrobe | fair      |  150.00 | Liuka Vasse (lfyndon4@gmail.com) on 2023-03-28 00:00:00             |
|       4 | Jason Voorhees's machete                   | prop     | excellent | 1000.00 | Sarena Vasse (svasse3@gmail.com) on 2022-12-06 00:00:00             |
+---------+--------------------------------------------+----------+-----------+---------+---------------------------------------------------------------------+
*/


-- Select order data used to populate the dropdown that associates a memorabilia item with an order. 
SELECT o.order_id, CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ') on ', o.order_date) AS ordered_by
FROM Orders AS o
JOIN Customers as c ON o.customer_id = c.customer_id;
/*
+----------+---------------------------------------------------------------------+
| order_id | ordered_by                                                          |
+----------+---------------------------------------------------------------------+
|        1 | Cordula de Courcey (cdecourcey1@dyndns.org) on 2022-06-22 00:00:00  |
|        2 | Donia Calderhead (dcalderhead2@netscape.com) on 2022-08-14 00:00:00 |
|        3 | Sarena Vasse (svasse3@gmail.com) on 2022-12-06 00:00:00             |
|        4 | Liuka Vasse (lfyndon4@gmail.com) on 2023-03-28 00:00:00             |
|        5 | Liuka Vasse (lfyndon4@gmail.com) on 2023-03-28 00:00:00             |
+----------+---------------------------------------------------------------------+
*/

-- Add a new memorabilia item.
INSERT INTO Memorabilia (description, type, `condition`, price, order_id)
VALUES (:description_input, :type_input, :condition_input, :price_input, :order_id_from_dropdown);

-- Select a memorabilia item to update or delete.
SELECT item_id, items.description, items.type, items.`condition`, items.price,
        CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ') on ', o.order_date) AS ordered_by
FROM Memorabilia AS items
LEFT JOIN Orders AS o ON items.order_id = o.order_id
LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
WHERE items.item_id = :item_id_selected_from_memorabilia_page;

-- Update a selected memorabilia item.
UPDATE Memorabilia
SET description = :description_input, type = :type_input,
    `condition` = :condition_input, price = :price_input,
    order_id = :order_id_from_dropdown
WHERE item_id = :item_id_selected_for_update;

-- Delete a selected memorabilia item.
DELETE FROM Memorabilia WHERE item_id = :item_id_selected_for_deletion;

-- Display all movie items (Memorabilia-Movies association).
SELECT mi.movie_item_id, i.description AS memorabilia_item, CONCAT(m.title, ' (', m.year, ')') AS movie
FROM MovieItems AS mi
JOIN Memorabilia AS i ON mi.item_id = i.item_id
JOIN Movies AS m ON m.movie_id = mi.movie_id;
/*
+---------------+--------------------------------------------+-------------------------+
| movie_item_id | memorabilia_item                           | movie                   |
+---------------+--------------------------------------------+-------------------------+
|             1 | Batman's cape                              | Batman Begins (2005)    |
|             2 | Batman's cape                              | The Dark Knight (2008)  |
|             3 | Godfather script signed by Al Pacino       | The Godfather (1972)    |
|             4 | Pulp Fiction rare movie poster             | Pulp Fiction (1994)     |
|             5 | Jason Voorhees's machete                   | Friday the 13th (1980)  |
|             6 | Patrick Bateman's business card            | American Psycho (2000)  |
|             7 | The Dude's robe                            | The Big Lebowski (1998) |
|             8 | Toy Story movie script signed by Tom Hanks | Toy Story (1995)        |
+---------------+--------------------------------------------+-------------------------+
*/

-- Select item data used to populate the item-movie association dropdown. 
SELECT item_id, description FROM Memorabilia;
/*
+---------+--------------------------------------------+
| item_id | description                                |
+---------+--------------------------------------------+
|       1 | Batman's cape                              |
|       2 | Godfather script signed by Al Pacino       |
|       3 | Pulp Fiction rare movie poster             |
|       4 | Jason Voorhees's machete                   |
|       5 | Patrick Bateman's business card            |
|       6 | The Dude's robe                            |
|       7 | Toy Story movie script signed by Tom Hanks |
+---------+--------------------------------------------+
*/

-- Select movie data used to populate the item-movie association dropdown. 
SELECT movie_id, CONCAT(title, ' (', year, ')') AS movie FROM Movies;
/*
+----------+-------------------------+
| movie_id | movie                   |
+----------+-------------------------+
|        1 | Batman Begins (2005)    |
|        2 | The Dark Knight (2008)  |
|        3 | The Godfather (1972)    |
|        4 | Pulp Fiction (1994)     |
|        5 | Friday the 13th (1980)  |
|        6 | American Psycho (2000)  |
|        7 | The Big Lebowski (1998) |
|        8 | Toy Story (1995)        |
+----------+-------------------------+
*/

-- Create an item-movie association.
INSERT INTO MovieItems (item_id, movie_id)
VALUES (:item_id_from_dropdown, :movie_id_from_dropdown);

-- Delete an item-movie association.
DELETE FROM MovieItems WHERE item_id = :item_id_from_dropdown AND movie_id = :movie_id_from_dropdown;

-- END MEMORABILIA PAGE --


-- MOVIES AND ACTORS PAGE --

-- Display all movies.
SELECT movie_id, title, year, genre FROM Movies;
/*
+----------+------------------+------+-----------+
| movie_id | title            | year | genre     |
+----------+------------------+------+-----------+
|        1 | Batman Begins    | 2005 | action    |
|        2 | The Dark Knight  | 2008 | action    |
|        3 | The Godfather    | 1972 | drama     |
|        4 | Pulp Fiction     | 1994 | NULL      |
|        5 | Friday the 13th  | 1980 | horror    |
|        6 | American Psycho  | 2000 | thriller  |
|        7 | The Big Lebowski | 1998 | comedy    |
|        8 | Toy Story        | 1995 | animation |
+----------+------------------+------+-----------+
*/

-- Add a new movie.
INSERT INTO Movies (title, year, genre) VALUES (:title_input, :year_input, :genre_input);

-- Display all actors.
SELECT actor_id, first_name, last_name FROM Actors;
/*
+----------+------------+-----------+
| actor_id | first_name | last_name |
+----------+------------+-----------+
|        1 | Christian  | Bale      |
|        2 | Al         | Pacino    |
|        3 | Uma        | Thurman   |
|        4 | Tom        | Hanks     |
|        5 | Meryl      | Streep    |
|        6 | Jeff       | Bridges   |
|        7 | Julianne   | Moore     |
+----------+------------+-----------+
*/

-- Add a new actor.
INSERT INTO Actors (first_name, last_name) VALUES (:first_name_input, :last_name_input);

-- Display all actor roles (Movies-Actors associations).
SELECT ar.actor_role_id, CONCAT(m.title, ' (', m.year, ')') AS movie, CONCAT(a.first_name, ' ', a.last_name) as actor
FROM ActorRoles AS ar
JOIN Movies AS m ON m.movie_id = ar.movie_id
JOIN Actors AS a ON ar.actor_id = a.actor_id;
/*
+---------------+-------------------------+----------------+
| actor_role_id | movie                   | actor          |
+---------------+-------------------------+----------------+
|             1 | Batman Begins (2005)    | Christian Bale |
|             2 | The Dark Knight (2008)  | Christian Bale |
|             5 | American Psycho (2000)  | Christian Bale |
|             3 | The Godfather (1972)    | Al Pacino      |
|             4 | Pulp Fiction (1994)     | Uma Thurman    |
|             8 | Toy Story (1995)        | Tom Hanks      |
|             6 | The Big Lebowski (1998) | Jeff Bridges   |
|             7 | The Big Lebowski (1998) | Julianne Moore |
+---------------+-------------------------+----------------+
*/

-- Select movie data used to populate the movie-actor association dropdown. 
SELECT movie_id, CONCAT(title, ' (', year, ')') AS movie FROM Movies;
/*
+----------+-------------------------+
| movie_id | movie                   |
+----------+-------------------------+
|        1 | Batman Begins (2005)    |
|        2 | The Dark Knight (2008)  |
|        3 | The Godfather (1972)    |
|        4 | Pulp Fiction (1994)     |
|        5 | Friday the 13th (1980)  |
|        6 | American Psycho (2000)  |
|        7 | The Big Lebowski (1998) |
|        8 | Toy Story (1995)        |
+----------+-------------------------+
*/

-- Select actor data used to populate the movie-actor association dropdown. 
SELECT actor_id, CONCAT(first_name, ' ', last_name) AS actor FROM Actors;
/*
+----------+----------------+
| actor_id | actor          |
+----------+----------------+
|        1 | Christian Bale |
|        2 | Al Pacino      |
|        3 | Uma Thurman    |
|        4 | Tom Hanks      |
|        5 | Meryl Streep   |
|        6 | Jeff Bridges   |
|        7 | Julianne Moore |
+----------+----------------+
*/

-- Create a movie-actor association.
INSERT INTO ActorRoles (movie_id, actor_id)
VALUES (:movie_id_from_dropdown, :actor_id_from_dropdown);

-- Delete a movie-actor association.
DELETE FROM ActorRoles WHERE movie_id = :movie_id_from_dropdown AND actor_id = :actor_id_from_dropdown;

-- END MOVIES AND ACTORS PAGE --