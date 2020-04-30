const pg = require('pg');
const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const pool = new pg.Pool(config);


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

  const getUserWithEmail = function(email){
    return pool.query(`SELECT * FROM users WHERE email LIKE $1`,[email])
    .then(res => {
      if(res.rows[0]) {
        return res.rows[0]
      } else {
        return null;
      }
    })
  }
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1`,[id])
    .then(res => {
      if(res.rows[0]) {
        return res.rows[0]
      } else {
        return null;
      }
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO USERS (name, password, email) 
                    VALUES ($1,$2,$3) RETURNING *`, [user.name, user.password, user.email])
                    .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*,  properties.*, AVG(rating) as average_rating
  FROM reservations
  JOIN properties on reservations.property_id = properties.id
  JOIN property_reviews on reservations.property_id = property_reviews.property_id
  WHERE end_date < now()::date AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date DESC
  LIMIT $2;`,[guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

  const getAllProperties = function (options, limit = 10) {
    
    const queryParams = [];

    let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON properties.id = property_id`;

    let whereClause = ` WHERE `;
    if(options.city) {
      queryParams.push(`%${options.city}%`);
      whereClause += `city LIKE $${queryParams.length}`;
    }
    if(options.owner_id){
      if(queryParams.length > 0) {
        whereClause += ' AND ';
      }
      queryParams.push(options.owner_id);
      whereClause += `owner_id = $${queryParams.length}`;
    }
    if(options.minimum_price_per_night) {
      if(queryParams.length > 0) {
        whereClause += ' AND ';
      }
      queryParams.push(options.minimum_price_per_night)
      whereClause += `cost_per_night >= $${queryParams.length}`;
    }
    if(options.maximum_price_per_night) {
      if(queryParams.length > 0) {
        whereClause += ' AND ';
      }
      queryParams.push(options.maximum_price_per_night);
      whereClause += `cost_per_night <= $${queryParams.length}`;
      
    }

    if(whereClause.length > 7) {
      queryString += whereClause;
    }
    
    queryString += ` GROUP BY properties.id`;
    if(options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryString += ` HAVING AVG(rating) > $${queryParams.length}`;
    }
    queryParams.push(limit);
    queryString += ` ORDER BY cost_per_night
                     LIMIT $${queryParams.length}`;
    
                    
    return (
      pool
      .query(queryString,queryParams)
      .then(res => res.rows)
    );
  }
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
