const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Port
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});