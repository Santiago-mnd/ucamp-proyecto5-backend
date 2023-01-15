require('dotenv').config();
const express = require('express');
const app = express();
const { dbConnection } = require('./config/db');
const cors = require('cors');

dbConnection();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hola desde root');
});

app.use('/gastos', require('./routes/gasto.routes'));

app.listen(process.env.PORT, () => {
  console.log(
    `Listening on http://localhost:${process.env.PORT}/`
  );
});
