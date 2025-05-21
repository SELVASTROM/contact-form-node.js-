const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WJ28@krhps',
  database: 'mydatabase'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());
app.use(express.static('public'));

// POST /contact route to save form data in database
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
 console.log('Received contact form:', req.body);  
  console.log('Contact form submission:', name, email, message);

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, message], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Message received');
  });
});

// Your existing route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
