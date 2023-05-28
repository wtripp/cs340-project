    UPDATE Memorabilia
    SET description = 'testing', type = 'script',
        `condition` = 'good', price = '5.00',
        order_id = null
    WHERE item_id = 3;

SELECT items.item_id, items.description, items.type, items.`condition`, items.price,
        CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
        FROM Memorabilia AS items
        JOIN Orders AS o ON items.order_id = o.order_id
        JOIN Customers AS c ON o.customer_id = c.customer_id
        WHERE items.item_id = 3;