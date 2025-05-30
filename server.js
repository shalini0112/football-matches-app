const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = '24bc2bd654c94255aaebd061061c5814'; 


app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/matches', {
      headers: { 'X-Auth-Token': API_KEY }
    });

    console.log('API Response Status:', response.status); 

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Matches:', data); 
      res.json(data);
    } else {
      res.status(response.status).send('Error fetching matches');
    }
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).send('Error fetching matches: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
