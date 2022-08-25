const config = require("./config/firebaseConfig");
const admin = require('firebase-admin');

admin.initializeApp(config.firebaseConfig);

module.exports = { admin };