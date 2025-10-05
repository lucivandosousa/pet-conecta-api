require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Adoção de Pets - OK' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});