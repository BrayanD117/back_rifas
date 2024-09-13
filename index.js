const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/db');

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api', routes);

// Port
const PORT = process.env.SERVER_PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
