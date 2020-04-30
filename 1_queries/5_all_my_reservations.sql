SELECT reservations.*,  properties.*, AVG(rating) as average_rating
FROM reservations
JOIN properties on reservations.property_id = properties.id
JOIN property_reviews on reservations.property_id = property_reviews.property_id
WHERE end_date < now()::date AND reservations.guest_id = 1
GROUP BY reservations.id, properties.id
ORDER BY start_date DESC
LIMIT 10;