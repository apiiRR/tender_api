const express = require('express');
const router = require('./routes/api');
const app = express();

app.listen(6969, () => {
  console.log("Server berjalan di : http://localhost:6969");
});

app.use(router);

