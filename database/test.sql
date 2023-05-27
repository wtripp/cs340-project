SELECT items.item_id,
            items.description,
            items.type,
            items.condition,
            items.price,
            CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
        FROM Memorabilia AS items
        LEFT JOIN Orders AS o ON items.order_id = o.order_id
        LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY items.item_id;