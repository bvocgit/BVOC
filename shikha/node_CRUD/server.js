const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const db = require('./db'); // Import MySQL connection

const port = 8080;

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const method = req.method;

  if (method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  } else if (method === 'POST' && parsedUrl.pathname === '/insert') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { employee_no, name, number } = JSON.parse(body);

      if (!employee_no || !name || !number) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Employee No, Name, and Number are required' }));
        return;
      }

      const sql = 'INSERT INTO employee (employee_no, name, number) VALUES (?, ?, ?)';
      db.query(sql, [employee_no, name, number], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to insert data' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Record inserted successfully' }));
      });
    });

  } else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/delete')) {
    const query = url.parse(req.url, true).query;
    const employee_no = query.employee_no;

    if (!employee_no) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Employee No is required' }));
      return;
    }

    const sql = 'DELETE FROM employee WHERE employee_no = ?';
    db.query(sql, [employee_no], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to delete data' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Record deleted successfully' }));
    });

  } else if (method === 'PUT' && parsedUrl.pathname === '/update') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { employee_no, name, number } = JSON.parse(body);

      if (!employee_no || !name || !number) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Employee No, Name, and number are required' }));
        return;
      }

      const sql = 'UPDATE employee SET name = ?, number = ? WHERE employee_no = ?';
      db.query(sql, [name, number, employee_no], (err, result) => {
        if (err) {
          console.error('Error updating data:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to update data' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Record updated successfully' }));
      });
    });

  } else if (method === 'GET' && parsedUrl.pathname === '/show') {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to retrieve data' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});