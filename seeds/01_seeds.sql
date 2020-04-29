INSERT INTO users (name, email, password) 
VALUES 
('Slum Lord', 'slummy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley', 'evast@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'domparks@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'rgarza@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leroy Hart', 'lhart@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
(1, 'Room Under the Stairs', 'description', 'https://i.ytimg.com/vi/YpWC6xnSBUc/hqdefault.jpg', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/8c/07/da/4-privet-drive.jpg', 75, 1, 0, 1, 'United Kingdom', '4 Privet Drive', 'Easting', 'Surrey', 'CR2 5ER'),
(1, 'Whole Apartment', 'description', 'invalid URL', 'invalid URL', 150, 1, 1, 2, 'Canada', '101-555 Main st', 'Vancouver', 'British Columbia', 'V4V 6H7'),
(3, 'Lovely Garden Suite', 'description', 'invalid URL', 'invalid URL', 225, 2, 2, 3, 'Canada', '2-123 Nice St', 'Edmonton', 'Alberta', 'T24 9A8');

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES
(4, 1, '2018-09-11', '2018-09-13'),
(2, 1, '2020-01-23', '2020-01-26'),
(4, 3, '2019-12-30', '2020-01-02');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(4,1,1,4,'message'),
(2,1,2,3,'message'),
(4,3,3,5, 'message');