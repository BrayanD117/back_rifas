const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const routes = require('./routes');
const sequelize = require('./config/db');

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000',"https://localhost:3000"],
  credentials: true,
}));

// Routes
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Port
const PORT = process.env.SERVER_PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
