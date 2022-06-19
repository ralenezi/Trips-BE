const express = require('express');
//routes
const tripsRoute = require('./apis/trips/trips.routes');

//db
const connectDB = require('./database/connection');
const app = express();

//middleware
app.use(express.json());

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log('🚀 ~ file: app.js ~ line 17 ~ app.use ~ err', err);
  res
    .status(err.status || 500)
    .json({ message: 'Internal Server Error' || err });
});
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//route
app.use('/', tripsRoute);

connectDB();

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
