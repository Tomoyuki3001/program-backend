require("dotenv").config();
const { Pool } = require("pg");
const { hashPassword } = require("../helpers/login");

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getAccountData = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(`SELECT id, name, email, phone, password, avatar FROM student;`)
    .then(async (result) => {
      return res.json({ error: "Wrong password" });
    })
    .catch((err) => console.log("ERROR", err))
    .finally(() => pool.end());
};

const getAllstudents = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(`SELECT id, name, email, phone, password, avatar FROM student;`)
    .then(async (result) => {
      const user = result.rows;
      return res.json(user);
    });
};

const addInformation = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `UPDATE student
      SET name='${req.body.name}', email='${req.body.email}', phone='${req.body.phone}'
      WHERE id='${req.body.id}';`
    )
    .then(async (result) => {
      return res.json({ message: "Changed information" });
    })
    .catch((err) => console.log("ERROR", err))
    .finally(() => pool.end());
};

const addPassword = async (req, res) => {
  const pool = new Pool(dbCredentials);
  const newPassword = await hashPassword(req.body.password, 12);
  pool
    .query(
      `UPDATE student
      SET password='${newPassword}'
      WHERE id='${req.body.id}';`
    )
    .then(async (result) => {
      return res.json({ message: "Changed password" });
    })
    .catch((err) => console.log("ERROR", err))
    .finally(() => pool.end());
};

module.exports = {
  getAccountData,
  getAllstudents,
  addInformation,
  addPassword,
};
