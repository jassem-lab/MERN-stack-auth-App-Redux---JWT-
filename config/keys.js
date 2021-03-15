require("dotenv").config();

module.exports = {
    mongoURI: process.env.MONOGDB_URI,
    secretOrKey: process.env.secretOrKey
}