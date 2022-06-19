const express = require("express");
//routes
const accountsRoute = require("./apis/accounts/accounts.routes");
//db
const connectDB = require("./database/connection");
const app = express();

//middleware
app.use(express.json());

//route
app.use("/api/accounts", accountsRoute);

app.get(accountsRoute, (req, res) => {
  res.json(accounts);
});

connectDB();

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
