const express = require('express');
const router = require('./routes/api');
const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server berjalan");
});

app.use(router);

