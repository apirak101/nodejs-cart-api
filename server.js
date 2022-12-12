const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'bjiz0a2cdezup4dqstam-mysql.services.clever-cloud.com',
  user: 'udxzv9o0fjm5y7bt',
  password: 'v886vi2LoK9HvWHEniv2',
  database: 'bjiz0a2cdezup4dqstam'
});

// Connect to the database
connection.connect();

// Define the endpoint for the "add to cart" feature
app.post('/add-to-cart', (req, res) => {
     // Get the item details from the request body
  const {name,price} = req.body;
  connection.query('INSERT INTO cart(name,price) VALUES(?,?)', [name, price], (error, results) => {
    if (error) {
        // If there was an error, send a failure response
        res.send({ status: "error", error });
      } else {
        // If the item was added successfully, send a success response
        res.send({ status: "success" });
      }
  });
});

// A route to fetch all cart
app.get('/cart', (req, res) => {
  connection.query('SELECT * FROM cart', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// A route to update an cart by id
app.patch('/cart/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  connection.query(
    'UPDATE cart SET name = ?, price = ? WHERE id = ?',
    [name,price,id],
    (error, results) => {
        if (error) {
            // If there was an error, send a failure response
            res.send({ status: "error", error });
          } else {
            // If the item was added successfully, send a success response
            res.send({ status: "success" });
          }
    }
  );
});

// A route to delete an cart by id
app.delete('/delete-cart/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM cart WHERE id = ?', id, (error, results) => {
    if (error) {
        // If there was an error, send a failure response
        res.send({ status: "error", error });
      } else {
        // If the item was added successfully, send a success response
        res.send({ status: "success" });
      }
  });
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
