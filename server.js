const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./controllers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(api);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});