/** @format */
const bcrypt = require("bcryptjs");

const admins = [
  {
    name: "korede",
    email: "korede@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    masterAdmin:true,
  },
  {
    name: "dipo",
    email: "dipo@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

module.exports = { admins };
