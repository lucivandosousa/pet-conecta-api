require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'API de Adoção de Pets - OK' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});