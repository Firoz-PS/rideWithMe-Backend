const http = require('http');
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const dbConfig = require("./config/dbConfig");

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const server = http.createServer(app);

// connecting to mongoDB Atlas
mongoose.connect(
	`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@cluster0.g6xp9.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use('/api/', require('./routes'));

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});