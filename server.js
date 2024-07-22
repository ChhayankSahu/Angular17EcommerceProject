const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Read mock data from JSON file
const dataPath = path.join(__dirname, 'mock-api-data.json');
let mockData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Function to create CRUD routes for each key in the mock data
const createRoutes = (key) => {

// Custom route to get all users
app.get('/users', (req, res) => {
  const users = mockData.user; // Get all users
  res.json(users);
});

  app.get('/user', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
  
    if (email && password) {
      const users = mockData.user; // Get all users
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } else {
      res.status(400).send({ error: 'Email and password are required' });
    }
  });


  app.get(`/${key}`, (req, res) => {
    res.json(mockData[key]);
  });



  app.get(`/${key}/:id`, (req, res) => {
    const item = mockData[key].find(u => u.id === parseInt(req.params.id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).send(`${key.slice(0, -1)} not found`);
    }
  });

 /*
 
  app.get(`/${key}/:email/:password`, (req, res) => {
    const item = mockData[key].find(u =>(u.email === parseInt(req.params.email))&&(u.password===parseInt(req.params.password) )   );
    if (item) {
      res.json(item);
    } else {
      res.status(400).send({ error: 'Email and password will be  required' });
    }
  });
 
 */


  app.post(`/${key}`, (req, res) => {
    let newId = mockData[key].length > 0 ? Math.max(...mockData[key].map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      ...req.body
    };
    mockData[key].push(newItem);
    fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
    res.status(201).json(newItem);
  });

  app.put(`/${key}/:id?`, (req, res) => {
    const id = req.params.id ? parseInt(req.params.id) : null;
    let item = mockData[key].find(u => u.id === id);

    if (id && item) {
      Object.assign(item, req.body);
      fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
      res.json(item);
    } else {
      let newId = mockData[key].length > 0 ? Math.max(...mockData[key].map(item => item.id)) + 1 : 1;
      const newItem = {
        id: newId,
        ...req.body
      };
      mockData[key].push(newItem);
      fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
      res.status(201).json(newItem);
    }
  });

  app.delete(`/${key}/:id`, (req, res) => {
    const itemIndex = mockData[key].findIndex(u => u.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
      mockData[key].splice(itemIndex, 1);
      fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
      res.status(204).send();
    } else {
      res.status(404).send(`${key.slice(0, -1)} not found`);
    }
  });

  
};

// Create routes for each key in the mock data
Object.keys(mockData).forEach(key => createRoutes(key));

// Start the server
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});
