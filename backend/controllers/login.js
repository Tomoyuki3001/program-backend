require("dotenv").config();
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getAuthorisedStudents = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `SELECT id, name, email, phone, password, avatar FROM student
    WHERE email = '${req.body.email}';`
    )
    .then(async (result) => {
      const receivedPassword = req.body.password;
      const user = result.rows[0];
      if (!user) return res.json({ message: "This e-mail is wrong" });
      const isMatch = await bcrypt.compare(receivedPassword, user.password);
      if (isMatch) {
        req.session.userId = user.id;
        return res.json({ message: "User authenticated", user: user });
      }
      return res.json({ error: "Wrong password" });
    })
    .catch((err) => console.log("ERROR", err))
    .finally(() => pool.end());
};

const getStudentId = async (req, res) => {
  if (req.session.userId) {
    const pool = new Pool(dbCredentials);
    pool
      .query(
        `SELECT id, name, email, phone, password, avatar FROM student
      WHERE id = '${req.session.userId}';`
      )
      .then(async (result) => {
        const user = result.rows[0];
        return res.json({
          message: "User cookie session was completed",
          user: user,
        });
      })
      .catch((err) => console.log("ERROR", err))
      .finally(() => pool.end());
  } else {
    return res.json({
      message: "User not logged",
      user: null,
    });
  }
};

const deleteUserInformation = (req, res) => {
  req.session = null;
  const user = {
    avatar: "",
    email: "",
    id: "",
    name: "",
    password: "",
    phone: "",
  };
  return res.json({ user: user });
};

module.exports = {
  getAuthorisedStudents,
  getStudentId,
  deleteUserInformation,
};
