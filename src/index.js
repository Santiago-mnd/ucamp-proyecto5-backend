require('dotenv').config();
const { dbConnection } = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();

dbConnection();
app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use(
  '/public',
  require('./routes/publicProducts.routes')
);
app.use(
  '/private',
  require('./routes/privateProducts.routes')
);

app.listen(process.env.PORT, () => {
  console.log(
    `Listening on http://localhost:${process.env.PORT}/`
  );
});
