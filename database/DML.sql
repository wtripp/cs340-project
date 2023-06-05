/*
Database manipulation queries for the Movie Memories database.
Will Tripp and Seth Stephanz (CS340 - Group 59 Portfolio Project)
Variable names are preceded by a colon (:).
*/

-- CUSTOMERS PAGE --

-- Browse Customers
SELECT customer_id, first_name, last_name, phone, email, address, city, state, postal_code FROM Customers;

-- Add Customer
INSERT INTO Customers (first_name, last_name, phone, email, address, city, state, postal_code)
VALUES (:first_name_input, :last_name_input, :phone_input, :email_input, :address_input, :city_input, :state_input, :postal_code_input);

-- Helper: Get customer data when user clicks "Edit" or "Delete"
SELECT customer_id, first_name, last_name, phone, email, address, city, state, postal_code
FROM Customers WHERE customer_id = :customer_id_selected_for_edit_or_delete;

-- Update Customer
UPDATE Customers
SET first_name = :first_name_input, last_name = :last_name_input,
    phone = :phone_input, email = :email_input,
    address = :address_input, city = :city_input,
    state = :state_input, postal_code = :post_code_input
WHERE customer_id = :customer_id_selected_for_edit_or_delete;

-- Delete Customer
DELETE FROM Customers WHERE customer_id = :customer_id_selected_for_edit_or_delete;

-- END CUSTOMERS PAGE --


-- ORDERS PAGE --

-- Browse Orders
SELECT o.order_id,
    IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date,
    IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date,
    IF(o.delivered_date = '0000-00-00', '', DATE_FORMAT(o.delivered_date, '%Y-%m-%d')) AS delivered_date,
    o.comment,
    CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
FROM Orders AS o
JOIN Customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_id;

-- Helper: Select customer data used to populate the dropdown that associates a customer with an order. 
SELECT customer_id, first_name, last_name, email FROM Customers;

-- Add Order
INSERT INTO Orders (order_date, ship_date, delivered_date, comment, customer_id)
VALUES (:order_date_input, :ship_date_input, :delivered_date_input, :comment_input, :customer_id_from_dropdown);

-- Helper: Get order data when user clicks "Edit" or "Delete".
SELECT o.order_id, o.order_date, o.ship_date, o.delivered_date, o.comment,
       CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
FROM Orders AS o
JOIN Customers AS c ON o.customer_id = c.customer_id AND order_id = :order_id_selected_for_edit_or_delete;

-- Update Order
UPDATE Orders
SET order_date = :order_date_input, ship_date = :ship_date_input,
    delivered_date = :delivered_date_input, comment = :comment_input,
    customer_id = :customer_id_from_dropdown
WHERE order_id = :order_id_selected_for_edit_or_delete;

-- Delete Order
DELETE FROM Orders WHERE order_id = :order_id_selected_for_edit_or_delete;

-- END ORDERS PAGE --


-- MEMORABILIA PAGE --

-- Browse Memorabilia
SELECT items.item_id,
    items.description,
    items.type,
    items.condition,
    items.price,
    CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', o.order_date) AS order_id
FROM Memorabilia AS items
LEFT JOIN Orders AS o ON items.order_id = o.order_id
LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
ORDER BY items.item_id;

-- Helper: Select order data used to populate the dropdown that associates a memorabilia item with an order. 
SELECT o.order_id,
    DATE_FORMAT(o.order_date, '%Y-%m-%d') AS order_date,
    CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer
FROM Orders AS o
JOIN Customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_id;

-- Add Memorabilia
INSERT INTO Memorabilia (description, type, `condition`, price, order_id)
VALUES (:description_input, :type_input, :condition_input, :price_input, :order_id_from_dropdown);

-- Helper: Get memorabilia data when user clicks "Edit" or "Delete".
SELECT item_id, items.description, items.type, items.`condition`, items.price,
        CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
FROM Memorabilia AS items
LEFT JOIN Orders AS o ON items.order_id = o.order_id
LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
WHERE items.item_id = :item_id_selected_for_edit_or_delete;

-- Update Memorabilia
UPDATE Memorabilia
SET description = :description_input, type = :type_input,
    `condition` = :condition_input, price = :price_input,
    order_id = :order_id_from_dropdown
WHERE item_id = :item_id_selected_for_edit_or_delete;

-- Delete Memorabilia
DELETE FROM Memorabilia WHERE item_id = :item_id_selected_for_edit_or_delete;

-- END MEMORABILIA PAGE --


-- MOVIE-ITEMS PAGE

-- Browse Movie Items
SELECT mi.movie_item_id,
    CONCAT(i.item_id, ' - ', i.description) AS item_id,
    CONCAT(m.movie_id, ' - ', m.title, ' (', m.year, ')') AS movie_id
FROM MovieItems AS mi
JOIN Memorabilia AS i ON mi.item_id = i.item_id
JOIN Movies AS m ON m.movie_id = mi.movie_id
ORDER BY mi.movie_item_id;

-- Helper: Select item data used to populate the item-movie association dropdown. 
SELECT item_id, description FROM Memorabilia ORDER BY item_id;

-- Helper: Select movie data used to populate the item-movie association dropdown. 
SELECT movie_id, CONCAT(title, ' (', year, ')') AS movie FROM Movies ORDER BY movie_id;

-- Add Movie Item
INSERT INTO MovieItems (item_id, movie_id)
VALUES (:item_id_from_dropdown, :movie_id_from_dropdown);

-- Helper: Get movie item data when user clicks "Edit" or "Delete".
SELECT mi.movie_item_id,
       CONCAT(i.item_id, ' - ', i.description) AS item_id,
       CONCAT(m.movie_id, ' - ', m.title, ' (', m.year, ')') AS movie_id
FROM MovieItems AS mi
JOIN Memorabilia AS i ON i.item_id = mi.item_id
JOIN Movies AS m ON m.movie_id = mi.movie_id
WHERE mi.movie_item_id = :movie_item_id_selected_for_edit_or_delete;

-- Update Movie Item
UPDATE MovieItems
SET item_id = :item_id_from_dropdown, movie_id = :movie_id_from_dropdown
WHERE movie_item_id = :movie_item_id_selected_for_edit_or_delete;

-- Delete Movie Item
DELETE FROM MovieItems WHERE movie_item_id = :movie_item_id_selected_for_edit_or_delete;


-- END MOVIE-ITEMS PAGE --


-- MOVIES PAGE --

-- Browse Movies
SELECT movie_id, title, year, genre FROM Movies ORDER BY movie_id;

-- Add Movie
INSERT INTO Movies (title, year, genre) VALUES (:title_input, :year_input, :genre_input);

-- Helper: Get movie data when user clicks "Edit" or "Delete"
SELECT movie_id, title, year, genre
FROM Movies WHERE movie_id = :movie_id_selected_for_edit_or_delete;

-- Update Movie
UPDATE Movies
SET title = :title_input, year = :year_input, genre = :genre_input
WHERE movie_id = :movie_id_selected_for_edit_or_delete;

-- Delete Movie
DELETE FROM Movies WHERE movie_id = :movie_id_selected_for_edit_or_delete;

-- END MOVIES PAGE --


-- ACTORS PAGE --

-- Browse Actors
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

-- Add Actor
INSERT INTO Actors (first_name, last_name) VALUES (:first_name_input, :last_name_input);

-- Helper: Get actor data when user clicks "Edit" or "Delete"
SELECT actor_id, first_name, last_name
FROM Actors WHERE actor_id = :actor_id_selected_for_edit_or_delete;

-- Update Actor
UPDATE Actors
SET first_name = :first_name_input, last_name = :last_name_input
WHERE actor_id = :actor_id_selected_for_edit_or_delete;

-- Delete Actor
DELETE FROM Actors WHERE actor_id = :actor_id_selected_for_edit_or_delete;

-- END ACTORS PAGE --


-- ACTOR-ROLES PAGE

-- Browse Actor Roles
SELECT ar.actor_role_id,
       CONCAT(m.movie_id, ' - ', m.title, ' (', m.year, ')') AS movie_id,
       CONCAT(a.actor_id, ' - ', a.first_name, ' ', a.last_name) as actor_id
FROM ActorRoles AS ar
JOIN Movies AS m ON m.movie_id = ar.movie_id
JOIN Actors AS a ON ar.actor_id = a.actor_id;
/*
+---------------+-----------------------------+--------------------+
| actor_role_id | movie_id                    | actor_id           |
+---------------+-----------------------------+--------------------+
|             1 | 1 - Batman Begins (2005)    | 1 - Christian Bale |
|             2 | 2 - The Dark Knight (2008)  | 1 - Christian Bale |
|             3 | 3 - The Godfather (1972)    | 2 - Al Pacino      |
|             4 | 4 - Pulp Fiction (1994)     | 3 - Uma Thurman    |
|             5 | 6 - American Psycho (2000)  | 1 - Christian Bale |
|             6 | 7 - The Big Lebowski (1998) | 6 - Jeff Bridges   |
|             7 | 7 - The Big Lebowski (1998) | 7 - Julianne Moore |
|             8 | 8 - Toy Story (1995)        | 4 - Tom Hanks      |
+---------------+-----------------------------+--------------------+
*/

-- Helper: Select movie data used to populate the movie-actor association dropdown. 
SELECT movie_id, CONCAT(title, ' (', year, ')') AS movie FROM Movies ORDER BY movie_id;
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

-- Helper: Select actor data used to populate the movie-actor association dropdown. 
SELECT actor_id, CONCAT(first_name, ' ', last_name) AS actor FROM Actors ORDER BY actor_id;
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

-- Add Actor Role
INSERT INTO ActorRoles (movie_id, actor_id)
VALUES (:movie_id_from_dropdown, :actor_id_from_dropdown);

-- Helper: Get actor role data when user clicks "Edit" or "Delete".
SELECT ar.actor_role_id,
       CONCAT(m.movie_id, ' - ', m.title, ' (', m.year, ')') AS movie_id,
       CONCAT(a.actor_id, ' - ', a.first_name, ' ', a.last_name) as actor_id
FROM ActorRoles AS ar
JOIN Movies AS m ON m.movie_id = ar.movie_id
JOIN Actors AS a ON ar.actor_id = a.actor_id
WHERE ar.actor_role_id = :actor_role_id_selected_for_edit_or_delete;

-- Update Actor Role
UPDATE ActorRoles
SET movie_id = :movie_id_from_dropdown, actor_id = :actor_id_from_dropdown
WHERE actor_role_id = :actor_role_id_selected_for_edit_or_delete;

-- Delete Actor Role
DELETE FROM ActorRoles WHERE actor_role_id = :actor_role_id_selected_for_edit_or_delete;

-- END ACTOR-ROLES PAGE --