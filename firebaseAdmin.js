const config = require("./config/firebaseConfig");
const { initializeApp, auth } = require("firebase-admin/app");

initializeApp(config.firebaseConfig);

module.exports = {auth};
